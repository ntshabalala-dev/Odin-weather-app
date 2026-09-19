import "../src/main.css";
import { setDateTime } from "./Helpers/getDateAndTime.js";
import getIconMapping from "./Helpers/getIconMapping.js";
import initDropDown from "./Modules/forecastDaysDropDown.js";
import {
    createCity, registerHamburgerMenuButtons
} from "./Modules/hamburgerMenu.js";
import {
    generateWeatherForecast,
    initSearchBar,
    initSearchForm,
} from "./Modules/search.js";
import initUnitConverter from "./Modules/unitConverter.js";

async function onLoad() {
    setDateTime();

    await generateWeatherForecast("Klerksdorp");

    document.querySelectorAll(".is-loading").forEach((element) => {
        element.classList.toggle("is-loading");
    });

    const currentLocations = JSON.parse(localStorage.getItem("locations")) || [];

    if (currentLocations.length > 0) {
        currentLocations.forEach((currentLocation) => {
            createCity(currentLocation)
        });
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    console.log(getIconMapping("partly-cloudy-day"));

    await onLoad();
    document.querySelector("main").classList.remove("skeleton");
    // Register events
    registerHamburgerMenuButtons(["#nav-menu__close", "#hamburger-btn"]);
    initSearchForm(".search-location-from");
    initSearchBar("#search-location__input");
    initDropDown("#hourly-forecast__days");
    initUnitConverter();
});
