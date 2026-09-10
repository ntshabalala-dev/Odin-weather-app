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
        "#temperature-details #description",
    );
    // Air conditions
    const locationFeelsLike = document.querySelector(
        "#weather-feels-like__value",
    );
    const locationPrecipitation = document.querySelector(
        "#weather-precipitation__value",
    );
    const locationWindSpeed = document.querySelector("#weather-wind__value");

    locationName.textContent = data.address;
    locationTemp.textContent = Math.round(data.days[0].temp);
    locationDesc.textContent = data.days[0].conditions;
    locationFeelsLike.textContent = Math.round(data.days[0].feelslike) + "°";
    locationPrecipitation.textContent = Math.round(data.days[0].precip) + "%";
    locationWindSpeed.textContent = Math.round(data.days[0].windspeed) + "km/h";
    // locationIcon.src =
    await loadDynamicImage(
        getIconMapping(data.days[0].icon),
        "#weather-icon img",
    );

    // 7 DAY FORECAST

    // HOURLY FORECAST
    data.days.forEach(day => {
        console.log(getDayOfTheWeek(day.datetime));
    });
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
    document.querySelector(selector).src = imageUrl;
}

export async function generateWeatherForecast(location) {
    try {
        // pauses function execution until promise is resolved. fetchTimelineWeather is a async fn that returns a promise
        const data = await fetchTimelineWeather(location);
        await generateWeatherForecastView(data);
    } catch (error) {
        //console.log(error.message);
        const errorMessage = error.message.split(":").at(-1);
        console.error(errorMessage);
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
