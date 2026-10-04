import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { getDayOfTheWeek, setDateTime } from "../Helpers/getDateAndTime.js";
import getIconMapping from "../Helpers/getIconMapping.js";
import {
    loadAirConditionIcons,
    loadDynamicImage,
    loadForecastPrecipIcon,
    loadForecastWeatherIcon,
    loadHourlyDynamicImage,
} from "../Helpers/loadAssets.js";
import showErrorToast from "../Helpers/Toast.js";
import { fetchCities, fetchTimelineWeather } from "../Service/weather.js";

// import toastify

let form;
let searchInput;
let citiesDropDown;
let debounceTimeout = null;
const loader = document.createElement("span");
loader.className = "loader";

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
    await generateSevenDayForecast(data);

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
            const from = hours.filter((hour) => {
                return hour.datetime > `${fromKey}:00`;
            });
            hours = [...from];
            console.log(hours);
        } else {
            hours = hours.filter((hour) => {
                return hour.datetime > hoursFrom;
            });
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
                <span class="is-loading metric-km" id="weather-wind__value">${Math.round(hour.windspeed)}km/h</span>
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
        let errorMessage = error.message.split(":").at(-1);

        if (errorMessage) {
            console.error(errorMessage);
        } else {
            console.error(`Failed to generate weather forecaset: ${error.message}`);
            errorMessage = error.message;
        }

        throw new Error(errorMessage);
    }

    console.log("2nd");
}

function validateForm() {
    if (searchInput.validity.valueMissing) {
        searchInput.setCustomValidity("City name required!");
        searchInput.reportValidity(); // ← shows the bubble now
        return false; // ← signals "invalid"
    }

    if (searchInput.value.length > 30) {
        searchInput.setCustomValidity("The city name is too long!");
        searchInput.reportValidity(); // ← shows the bubble now
        return false; // ← signals "invalid"
    }

    return true;
}

async function handleSearchInputChange(searchInput) {
    clearTimeout(debounceTimeout);
    // settimeout returns a timeoutID, which can be used to clear the timeout before it executes. This is useful for debouncing, where you want to delay the execution of a function until a certain amount of time has passed since the last time it was invoked.
    debounceTimeout = setTimeout(async () => {
        try {
            const cities = await fetchCities(searchInput.trim());
            console.log("Cities data:", cities);
            citiesDropDown.textContent = "";

            if (cities.length <= 0) {
                createCityRow();
                citiesDropDown.style.visibility = "visible";
                return;
            }

            cities.splice(5);
            cities.forEach(city => {
                createCityRow(city);
            });
            citiesDropDown.style.visibility = "visible";
        } catch (error) {
            console.error("Error fetching cities:", error);
            return null;
        }
    }, 300); // Adjust the delay as needed
}

function createCityRow(city = null) {
    const cityRow = document.createElement("div");
    const cityName = document.createElement("p");
    cityName.className = 'city-name';
    cityRow.className = "cities__container";
    cityName.textContent = city ? city.name : 'Not found';
    cityRow.appendChild(cityName);
    citiesDropDown.appendChild(cityRow);
}

export function initSearchForm(formSelector) {
    // .search-location-from
    form = document.querySelector(formSelector);
    searchInput = document.getElementById("search-location__input");
    const searchButtonIcon = document.querySelector(
        "#search-location__btn > img",
    );

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        let searchTerm = searchInput.value.trim();
        searchTerm = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1);

        setDateTime();

        if (citiesDropDown.style.visibility === 'visible') {
            citiesDropDown.style.visibility = 'hidden'
        }

        try {
            searchButtonIcon.replaceWith(loader);
            await generateWeatherForecast(searchTerm);
            loader.replaceWith(searchButtonIcon);
        } catch (error) {
            showErrorToast(error.message);
            loader.replaceWith(searchButtonIcon);
            return;
        }

        document.querySelectorAll(".is-loading").forEach((element) => {
            element.classList.remove("is-loading");
        });

        const searchEvent = new CustomEvent("searchPerformed", {
            bubbles: true, // Allows the event to travel up the HTML tree
            detail: {
                searchTerm: searchTerm,
                timestamp: Date.now(),
            },
        });

        const currentLocations =
            JSON.parse(localStorage.getItem("locations")) || [];

        if (!currentLocations.includes(searchTerm)) {
            // 2. Push the new item
            currentLocations.push(searchTerm);
            localStorage.setItem("locations", JSON.stringify(currentLocations));

            //Dispatch event so that the latest weather Data gets sent to the forecastDaysDropDown.js module
            form.dispatchEvent(searchEvent);
        }
    });
}

export function initSearchBar(inputSelector) {
    const searchBar = document.querySelector(inputSelector);
    const clearButton = document.querySelector("#clear-button-img");
    const locationDropDown = document.querySelector(".search__cities");
    citiesDropDown = document.querySelector(".search__cities");

    searchBar.addEventListener("input", async () => {
        if (searchBar.value.length > 0) {
            clearButton.style.visibility = "visible";
            if (searchBar.value.length > 3) {
                await handleSearchInputChange(searchBar.value);
            } else {
                citiesDropDown.style.visibility = "hidden";
            }
        } else {
            clearButton.style.visibility = "hidden";
            citiesDropDown.style.visibility = "hidden";
        }
    });

    locationDropDown.addEventListener("click", async (event) => {
        const clickedElement = event.target;

        if (clickedElement.classList.contains("city-name")) {
            const selectedCity = clickedElement.textContent;
            searchBar.value = selectedCity;
            citiesDropDown.style.visibility = "hidden";
            form.requestSubmit(); // Trigger the form submission
        }
    });

    clearButton.addEventListener("click", () => {
        searchBar.value = "";
        clearButton.style.visibility = "hidden";
        citiesDropDown.style.visibility = "hidden"
    });
}
