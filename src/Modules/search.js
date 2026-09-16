import { format } from "date-fns";
import { getDayOfTheWeek, setDateTime } from "../Helpers/getDateAndTime.js";
import getIconMapping from "../Helpers/getIconMapping.js";
import fetchTimelineWeather from "../Service/weather.js";

// import toastify

// let searchButton = null;
// protected functions?
let searchInput = null;

async function generateWeatherForecastView(data) {
    // OVERVIEW
    const locationName = document.getElementById("location__name");
    const locationTemp = document.querySelector("#temperature-amount #value");
    const locationDesc = document.querySelector(
        "#weather-extra-details #description",
    );

    console.log('hello');
    // Air conditions
    const locationFeelsLike = document.querySelector(
        "#feels-like__value",
    );

    locationName.textContent = data.address;
    locationTemp.textContent = Math.round(data.days[0].temp);
    locationDesc.textContent = data.days[0].conditions;
    locationFeelsLike.textContent = Math.round(data.days[0].feelslike) + "°";

    await loadDynamicImage(
        getIconMapping(data.days[0].icon),
        "#weather-icon img",
    );

    // 7 DAY FORECAST
    const forecastContainer = document.getElementById('weather-forecast__container')
    forecastContainer.textContent = '';
    data.days.forEach(async (day) => {
        console.log();


        const forecastDayCard = document.createElement('div')
        forecastDayCard.className = 'weather-forecast__card'
        forecastDayCard.innerHTML = `
                    <!-- DAY -->
                    <span class="weather-forecast__text is-loading">${format((new Date(day.datetime)), "EEEE")}</span>
                    <!-- ICON -->
                    <div class="weather-forecast__icon is-loading">
                        <img class="weather-forecast__icon" src="./Assets/weather_icons/clearnight2.svg" alt="">
                    </div>
                    <!-- TEMP -->
                    <span class="weather-forecast__temperature is-loading">
                        <span id="max">${Math.round(day.tempmax)}°</span>&#8210;<span id="min">${Math.round(day.tempmin)}°</span>
                    </span>
                    <!-- DESCRIPTION -->
                    <div class="description-container"><span class="weather-forecast__description is-loading">${day.conditions}</span></div>
                    <!-- PRECIPITATION -->
                    <span class="weather-forecast__precipitation">
                        <img src="./Assets/air_conditions/Rain.svg" alt="">
                        <span class="weather-precipitation is-loading"
                            id="weather-precipitation__value value">12%</span>
                    </span>`

        forecastContainer.appendChild(forecastDayCard)
        await loadforecastImages(forecastDayCard)
    });

    // HOURLY FORECAST
    await generateHourlyForecast(data);
}

async function generateHourlyForecast(data) {
    const dropDown = document.querySelector('#hourly-forecast__days');
    const hourlyForecastBody = document.querySelector('#hourly-forecast__body');

    dropDown.textContent = '';
    hourlyForecastBody.textContent = '';
    data.days.forEach(day => {
        const option = document.createElement('option')
        option.value = getDayOfTheWeek(day.datetime);
        option.textContent = getDayOfTheWeek(day.datetime);
        dropDown.appendChild(option)
    });

    dropDown.selectedIndex = 0;

    const now = new Date();
    let hours = data.days[0].hours;
    const windowLow = `${format(now, "HH")}:00`
    const windowHigh = +windowLow.split(':')[0] + 1
    const hoursFrom = format(now, "HH") === windowLow
        ? windowLow
        : windowHigh < 10 ? `0${windowHigh}:00` : `${windowHigh}:00`

    if (hoursFrom > "12:00") {
        const fromKey = +hoursFrom.split(':')[0]
        let toKey = fromKey - 12;
        const from = hours.filter((hour) => {
            return hour.datetime > `${fromKey}:00`
        })

        if (toKey < 10) {
            toKey = `0${toKey}`
        }

        const to = hours.filter((hour) => {
            return hour.datetime < `${toKey}:00`
        })
        hours = [...from, ...to]
    } else {
        hours = hours.filter((hour) => {
            return hour.datetime > hoursFrom
        }).slice(0, 12)
    }

    hours.forEach(async (hour) => {
        const forecastCard = document.createElement('div');
        const time = `${hour.datetime.slice(0, 2)}`
        const hourlyIcon = `${hour.icon}`
        const newId = `${hourlyIcon}-${time}`

        forecastCard.innerHTML =
            `<div class="hourly-forecast__card">
            <!-- <div class="half"> -->
            <span class="hour is-loading">${hour.datetime.slice(0, 5)}</span>
            <span class="icon is-loading">
                <img class="hourly-forecast__icon" id="${newId}" src="" alt="">
                <span id="description">${hour.conditions}</span>
            </span>
            <span class="temperature is-loading">
                <span id="max">${Math.round(hour.temp)}°</span>
            </span>
            <!-- </div> -->
            <span id="feels-like">
                <img src="" alt="">
                <span class="is-loading" id="feels-like__value value">${Math.round(hour.feelslike)}</span>
            </span>
            <!--  -->
            <span id="wind">
                <img src="" alt="">
                <span class="is-loading" id="weather-wind__value value">${Math.round(hour.windspeed)}km/h</span>
            </span>
            <!--  -->
            <span id="precipitation">
                <img src="./Assets/air_conditions/Rain.svg" alt="">
                <span class="is-loading" id="precipitation__value value">${hour.precip}%</span>
            </span>
        </div>`;


        hourlyForecastBody.appendChild(forecastCard)

        await loadAirConditionIcons(forecastCard)
        await loadHourlyDynamicImage(hourlyIcon, newId)
    });
}

async function loadforecastImages(forecastDay) {
    let imageurl = await import('../Assets/air_conditions/Rain.svg')
    imageurl = imageurl.default;
    const precipIcon = forecastDay.querySelector('.weather-forecast__precipitation img')
    precipIcon.src = imageurl
}

async function loadAirConditionIcons(row) {
    const data = [
        { "feels-like": "Temperature.svg" },
        { "wind": "Wind.svg" },
        { "precipitation": "Rain.svg" }
    ]

    data.forEach(async (element) => {

        const [[key, value]] = Object.entries(element);

        let imageUrl = await import(`../Assets/air_conditions/${value}`);

        imageUrl = imageUrl.default;
        const icon = row.querySelector(`.hourly-forecast__card #${key} img`);
        icon.src = imageUrl
    });
}

async function loadHourlyDynamicImage(hourlyIcon, hourIdentifier) {
    let imageUrl = '';
    try {
        imageUrl = await import(`../Assets/weather_icons/${getIconMapping(hourlyIcon)}`);
        imageUrl = imageUrl.default;
    } catch (error) {
        console.error(`Failed to load the image file for ${hourIdentifier}:`, error);
        imageUrl = `../Assets/sun.svg`;
    }
    const icon = document.querySelector(`#${hourIdentifier}`);
    icon.src = imageUrl
}

async function loadDynamicImage(iconMapping, selector) {
    // 1. Declare the variable outside so you can use it later
    let imageUrl = "";

    try {
        // 2. Try to import the image and destructure it immediately
        imageUrl = await import(`../Assets/weather_icons/${iconMapping}`);

        imageUrl = imageUrl.default;

        // 3. If successful, you can use the URL here
        console.log("Success! Image URL is:", imageUrl);
    } catch (error) {
        // 4. If anything goes wrong, catch the error and set a fallback
        console.error("Failed to load the image file:", error);
        imageUrl = `../Assets/sun.svg`;
    }

    // 5. Use the final URL (either the real one or the fallback)
    const icon = document.querySelector(selector);
    icon.className = iconMapping.split('.')[0];
    icon.src = imageUrl;
}

export async function generateWeatherForecast(location) {
    try {
        // pauses function execution until promise is resolved. fetchTimelineWeather is a async fn that returns a promise
        const data = await fetchTimelineWeather(location);
        await generateWeatherForecastView(data);
    } catch (error) {
        console.error(error.message);
        return;
    }

    console.log("2nd");
}

export function initSearchForm(formSelector) {
    // .search-location-from
    const form = document.querySelector(formSelector);
    searchInput = document.getElementById("search-location__input");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        setDateTime();
        //FE Validate here?
        await generateWeatherForecast(searchInput.value);

        document.querySelectorAll('.is-loading').forEach(element => {
            element.classList.remove('is-loading')
        });
    });
}
