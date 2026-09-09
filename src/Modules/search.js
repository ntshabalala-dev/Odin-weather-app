import fetchTimelineWeather from "../Service/weather.js";

// import toastify

// let searchButton = null;
// protected functions?
let searchInput = null;

async function generateWeatherForecastView(data) {
    // OVERVIEW
    const locationName = document.getElementById('location__name')
    const locationTemp = document.querySelector('#temperature-amount #value')
    const locationDesc = document.querySelector('#temperature-details #description')
    const locationIcon = document.querySelector('#weather-icon img')

    locationName.textContent = data.address
    locationTemp.textContent = Math.round(data.days[0].temp)
    locationDesc.textContent = data.days[0].conditions
    // locationIcon.src =

    // 7 DAY FORECAST

    // HOURLY FORECAST
}

export async function generateWeatherForecast(location) {
    try {
        // pauses function execution until promis is resolved. fetchTimelineWeather is a async fn that returns a promise
        const data = await fetchTimelineWeather(location);
        generateWeatherForecastView(data)
    } catch (error) {
        //console.log(error.message);
        const errorMessage = error.message.split(":").at(-1);
        console.error(errorMessage)
        return
    }

    console.log("2nd");
}

export function initSearchForm(formSelector) {
    // .search-location-from
    const form = document.querySelector(formSelector);
    searchInput = document.getElementById("search-location__input");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        //FE Validate here?
        generateWeatherForecast(searchInput.value);
    });
}
