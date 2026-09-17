import { generateHourlyForecast } from './search.js'

let weatherData = null;

export default function initDropDown(dropDownSelector) {
    const dropDown = document.querySelector(dropDownSelector);
    weatherData = JSON.parse(localStorage.getItem("weatherData"));

    dropDown.addEventListener("change", async () => {
        if (weatherData) {
            console.log(dropDown.selectedIndex);
            console.log(weatherData);
            await generateHourlyForecast(weatherData, dropDown.selectedIndex)

            document.querySelectorAll(".is-loading").forEach((element) => {
                element.classList.remove("is-loading");
            });
        }
    });

    document.querySelector('main').addEventListener('searchPerformed', (event) => {
        console.log(`Searching for: ${event.detail.searchTerm}`);

        weatherData = JSON.parse(localStorage.getItem("weatherData"));
    });
}
