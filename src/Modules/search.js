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



    // locationPrecipitation.textContent = Math.round(data.days[0].precip) + "%";
    // locationWindSpeed.textContent = Math.round(data.days[0].windspeed) + "km/h";
    // locationIcon.src =
    await loadDynamicImage(
        getIconMapping(data.days[0].icon),
        "#weather-icon img",
    );

    // 7 DAY FORECAST

    // HOURLY FORECAST
    const dropDown = document.querySelector('#hourly-forecast__days');
    const hourlyForecastBody = document.querySelector('#hourly-forecast__body');

    dropDown.textContent = '';
    hourlyForecastBody.textContent = '';

    data.days.forEach(day => {
        console.log(getDayOfTheWeek(day.datetime));
        const option = document.createElement('option')
        option.value = getDayOfTheWeek(day.datetime);
        option.textContent = getDayOfTheWeek(day.datetime);
        dropDown.appendChild(option)
    });

    dropDown.selectedIndex = 0;
    const forecastCard = document.createElement('div');
    forecastCard.innerHTML =
        `<div class="hourly-forecast__card">
            <!-- <div class="half"> -->
            <span class="hour is-loading">18:00</span>
            <span class="icon is-loading">
                <img class="hourly-forecast__icon" src="./Assets/weather_icons/partlycloudy.svg" alt="">
                <span id="description">Partly cloudy</span>
            </span>
            <span class="temperature is-loading">
                <span id="max">23°</span>&#47;<span id="min">12°</span>
            </span>
            <!-- </div> -->
            <span id="feels-like">
                <img src="./Assets/air_conditions/Temperature.svg" alt="">
                <span class="is-loading" id="feels-like__value value">24°</span>
            </span>
            <!--  -->
            <span id="wind">
                <img src="./Assets/air_conditions/Wind.svg" alt="">
                <span class="is-loading" id="weather-wind__value value">10km/h</span>
            </span>
            <!--  -->
            <span id="precipitation">
                <img src="./Assets/air_conditions/Rain.svg" alt="">
                <span class="is-loading" id="precipitation__value value">40%</span>
            </span>
        </div>`
    hourlyForecastBody.appendChild(forecastCard)
}

async function loadDynamicImage(iconMpapping, selector) {
    // 1. Declare the variable outside so you can use it later
    let imageUrl = "";

    try {
        // 2. Try to import the image and destructure it immediately
        imageUrl = await import(`../Assets/weather_icons/${iconMpapping}`);

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
    icon.className = iconMpapping.split('.')[0];
    icon.src = imageUrl;
}

export async function generateWeatherForecast(location) {
    try {
        // pauses function execution until promise is resolved. fetchTimelineWeather is a async fn that returns a promise
        const data = await fetchTimelineWeather(location);
        await generateWeatherForecastView(data);
    } catch (error) {
        console.error(error.message);
        //const errorMessage = error.message.split(":").at(-1);
        //console.error(errorMessage);
        return;
    }

    console.log("2nd");
}

export function initSearchForm(formSelector) {
    // .search-location-from
    const form = document.querySelector(formSelector);
    searchInput = document.getElementById("search-location__input");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        setDateTime();
        //FE Validate here?
        generateWeatherForecast(searchInput.value);
    });
}
