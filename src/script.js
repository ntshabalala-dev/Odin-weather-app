import "../src/main.css";
import { setDateTime } from "./Helpers/getDateAndTime.js";
import getIconMapping from "./Helpers/getIconMapping.js";
import initDropDown from "./Modules/forecastDaysDropDown.js";
import registerHamburgerMenuButtons from "./Modules/hamburgerMenu.js";
import {
    generateWeatherForecast,
    initSearchBar,
    initSearchForm,
} from "./Modules/search.js";

async function onLoad() {
    setDateTime();

    await generateWeatherForecast("Klerksdorp");

    document.querySelectorAll(".is-loading").forEach((element) => {
        element.classList.toggle("is-loading");
    });
}

const tempSymbols = document.querySelector('#temperature-details #metric')

tempSymbols.addEventListener('click', (e) => {
    const target = e.target
    const selected = document.querySelector('#metric .selected')
    if (
        target.classList.contains('selected') ||
        (target.id !== 'fahrenheit' &&
            target.id !== 'celsius')
    ) {
        return;
    }

    selected.classList.remove('selected')
    target.classList.add('selected')
    console.log(target);
})

document.addEventListener("DOMContentLoaded", async () => {
    console.log(getIconMapping("partly-cloudy-day"));

    await onLoad();
    document.querySelector("main").classList.remove("skeleton");
    // Register events
    registerHamburgerMenuButtons(["#nav-menu__close", "#hamburger-btn"]);
    initSearchForm(".search-location-from");
    initSearchBar("#search-location__input");
    initDropDown("#hourly-forecast__days")
});
