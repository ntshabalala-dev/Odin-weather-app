import "../src/main.css";
import { setDateTime } from "./Helpers/getDateAndTime.js";
import getIconMapping from "./Helpers/getIconMapping.js";
import registerHamburgerMenuButtons from "./Modules/hamburgerMenu.js";
import { generateWeatherForecast, initSearchForm } from "./Modules/search.js";

async function onLoad() {
    setDateTime()

    // await generateWeatherForecast('Klerksdorp')

    document.querySelectorAll('.is-loading').forEach(element => {
        element.classList.toggle('is-loading')
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    const log = console.log
    console.log(getIconMapping("partly-cloudy-day"));

    await onLoad()
    document.querySelector('main').classList.remove('skeleton')
    // Register events
    registerHamburgerMenuButtons(["#nav-menu__close", "#hamburger-btn"]);
    initSearchForm('.search-location-from')

});
