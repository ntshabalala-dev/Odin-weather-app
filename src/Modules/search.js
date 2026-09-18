import { format } from "date-fns";
import { getDayOfTheWeek, setDateTime } from "../Helpers/getDateAndTime.js";
import getIconMapping from "../Helpers/getIconMapping.js";
import {
    loadAirConditionIcons,
    loadDynamicImage,
    loadForecastPrecipIcon,
    loadForecastWeatherIcon,
    loadHourlyDynamicImage,
} from "../Helpers/loadAssets.js";
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

    // Air conditions
    const locationFeelsLike = document.querySelector("#feels-like__value");

    locationName.textContent = data.address;
    locationTemp.textContent = Math.round(data.days[0].temp);
    locationDesc.textContent = data.days[0].conditions;
    locationFeelsLike.textContent = Math.round(data.days[0].feelslike) + "°";

    await loadDynamicImage(
        getIconMapping(data.days[0].icon),
        "#weather-icon img",
    );

    // 7 DAY FORECAST
    await generateSevenDayForecast(data)

    // HOURLY FORECAST
    generateHourlyForecastDays(data);
    await generateHourlyForecast(data);
}

async function generateSevenDayForecast(data) {
    const forecastContainer = document.getElementById(
        "weather-forecast__container",
    );
    forecastContainer.textContent = "";
    data.days.forEach(async (day) => {
        const forecastDayCard = document.createElement("div");
        forecastDayCard.className = "weather-forecast__card";
        forecastDayCard.innerHTML = `
                    <!-- DAY -->
                    <span class="weather-forecast__text is-loading">${format(new Date(day.datetime), "EEEE")}</span>
                    <!-- ICON -->
                    <div class="weather-forecast__icon is-loading">
                        <img class="weather-forecast__icon" src="" alt="">
                    </div>
                    <!-- TEMP -->
                    <span class="weather-forecast__temperature is-loading">
                        <span class="metric-celcius" id="max">${Math.round(day.tempmax)}°</span>&#47;<span class="metric-celcius" id="min">${Math.round(day.tempmin)}°</span>
                    </span>
                    <!-- DESCRIPTION -->
                    <div class="description-container"><span class="weather-forecast__description is-loading">${day.conditions}</span></div>
                    <!-- PRECIPITATION -->
                    <span class="weather-forecast__precipitation">
                        <img src="./Assets/air_conditions/Rain.svg" alt="">
                        <span class="weather-precipitation is-loading"
                            id="weather-precipitation__value value">${Math.round(day.precipprob)}%</span>
                    </span>`;

        forecastContainer.appendChild(forecastDayCard);
        await loadForecastPrecipIcon(forecastDayCard);
        await loadForecastWeatherIcon(getIconMapping(day.icon), forecastDayCard);
    });
}

function generateHourlyForecastDays(data) {
    const dropDown = document.querySelector("#hourly-forecast__days");
    dropDown.textContent = "";

    data.days.forEach((day) => {
        const option = document.createElement("option");
        option.value = getDayOfTheWeek(day.datetime);
        option.textContent = getDayOfTheWeek(day.datetime);
        dropDown.appendChild(option);
    });

    dropDown.selectedIndex = 0;
}

export async function generateHourlyForecast(data, index = 0) {
    const hourlyForecastBody = document.querySelector("#hourly-forecast__body");
    hourlyForecastBody.textContent = "";

    const now = new Date();
    let hours = data.days[index].hours;

    // Only calculate from current time on current day
    if (index === 0) {
        const windowLow = `${format(now, "HH")}:00`;
        const windowHigh = +windowLow.split(":")[index] + 1;
        const hoursFrom =
            format(now, "HH") === windowLow
                ? windowLow
                : windowHigh < 10
                    ? `0${windowHigh}:00`
                    : `${windowHigh}:00`;

        if (hoursFrom > "12:00") {
            const fromKey = +hoursFrom.split(":")[index];
            let toKey = fromKey - 12;
            const from = hours.filter((hour) => {
                return hour.datetime > `${fromKey}:00`;
            });

            if (toKey < 10) {
                toKey = `0${toKey}`;
            }

            const to = hours.filter((hour) => {
                return hour.datetime < `${toKey}:00`;
            });
            hours = [...from, ...to];
        } else {
            hours = hours
                .filter((hour) => {
                    return hour.datetime > hoursFrom;
                })
                .slice(0, 12);
        }
    }

    hours.forEach(async (hour) => {
        const forecastCard = document.createElement("div");
        const time = `${hour.datetime.slice(0, 2)}`;
        const hourlyIcon = `${hour.icon}`;
        const newId = `${hourlyIcon}-${time}`;

        forecastCard.innerHTML = `<div class="hourly-forecast__card">
            <!-- <div class="half"> -->
            <span class="hour is-loading">${hour.datetime.slice(0, 5)}</span>
            <span class="icon is-loading">
                <img class="hourly-forecast__icon" id="${newId}" src="" alt="">
                <span id="description">${hour.conditions}</span>
            </span>
            <span class="temperature is-loading">
                <span class="metric-celcius" id="max">${Math.round(hour.temp)}°</span>
            </span>
            <!-- </div> -->
            <span id="feels-like">
                <img src="" alt="">
                <span class="is-loading metric-celcius" id="feels-like__value value">${Math.round(hour.feelslike)}°</span>
            </span>
            <!--  -->
            <span id="wind">
                <img src="" alt="">
                <span class="is-loading metric-km" id="weather-wind__value value">${Math.round(hour.windspeed)}km/h</span>
            </span>
            <!--  -->
            <span id="precipitation">
                <img src="" alt="">
                <span class="is-loading" id="precipitation__value value">${Math.round(hour.precipprob)}%</span>
            </span>
        </div>`;

        hourlyForecastBody.appendChild(forecastCard);

        await loadAirConditionIcons(forecastCard);
        await loadHourlyDynamicImage(hourlyIcon, newId);
    });
}

export async function generateWeatherForecast(location) {
    try {
        // pauses function execution until promise is resolved. fetchTimelineWeather is a async fn that returns a promise
        const data = await fetchTimelineWeather(location);
        await generateWeatherForecastView(data);
    } catch (error) {
        const errorMessage = error.message.split(":").at(-1);
        if (errorMessage) {
            console.error(errorMessage);
        } else {
            console.error(`Failed to generate weather forecaset: ${error.message}`);
        }
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

        document.querySelectorAll(".is-loading").forEach((element) => {
            element.classList.remove("is-loading");
        });

        const searchEvent = new CustomEvent('searchPerformed', {
            bubbles: true, // Allows the event to travel up the HTML tree
            detail: {
                searchTerm: searchInput.value,
                timestamp: Date.now()
            }
        });

        //Dispatch event so that the latest weather Data gets sent to the forecastDaysDropDown.js module
        form.dispatchEvent(searchEvent);
    });
}

export function initSearchBar(inputSelector) {
    const searchBar = document.querySelector(inputSelector);
    const clearButton = document.querySelector("#clear-button-img");

    searchBar.addEventListener("input", () => {
        if (searchBar.value.length > 0) {
            clearButton.style.visibility = "visible";
        } else {
            clearButton.style.visibility = "hidden";
        }
    });

    clearButton.addEventListener("click", () => {
        searchBar.value = "";
        clearButton.style.visibility = "hidden";
    });
}
