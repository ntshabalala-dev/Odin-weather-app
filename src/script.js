import "../src/main.css";
import dateTime from "./Helpers/getDateAndTime.js";
import getIconMapping from "./Helpers/getIconMapping.js";
import registerHamburgerMenuButtons from "./Modules/hamburgerMenu.js";
import { generateWeatherForecast, initSearchForm } from "./Modules/search.js";

async function onLoad() {
    const date = document.querySelector('#location__date-time #date');
    const time = document.querySelector('#location__date-time #time');
    date.textContent = dateTime.date
    time.textContent = dateTime.time

    await generateWeatherForecast('Klerksdorp')
}



document.addEventListener("DOMContentLoaded", async () => {
    const log = console.log



    log(dateTime.timestamp)

    log(dateTime.date, '|', dateTime.time)



    console.log(getIconMapping("partly-cloudy-day"));

    await onLoad()
    document.querySelector('main').classList.remove('skeleton')
    // Register events
    registerHamburgerMenuButtons(["#nav-menu__close", "#hamburger-btn"]);
    initSearchForm('.search-location-from')

});
