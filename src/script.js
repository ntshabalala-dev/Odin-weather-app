import "../src/main.css";
import dateTime from "./Helpers/getDateAndTime.js";
import getIconMapping from "./Helpers/getIconMapping.js";
import registerHamburgerMenuButtons from "./Modules/hamburgerMenu.js";
import fetchTimelineWeather from "./Service/weather.js";

// Visual Crossing Timeline Weather API example
// Fetches timeline data for a location using metric units, with output in JSON format
// Filters for windspeed, description, and icon weather elements

document.addEventListener("DOMContentLoaded", async () => {
    try {
        //const data = await fetchTimelineWeather("Toronto");
    } catch (error) {
        //console.log(error);
    }
    console.log(dateTime.date, '|', dateTime.time)

    console.log(getIconMapping("partly-cloudy-day"));

    // Register events
    registerHamburgerMenuButtons(["#nav-menu__close", "#hamburger-btn"]);
});
