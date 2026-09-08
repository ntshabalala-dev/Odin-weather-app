import "../src/main.css";
import { format } from 'date-fns';

// import "./Assets/bg/3.jpg";

// Grab the button and the menu from the HTML
const hamburger = document.getElementById("hamburger-btn");
const navMenu = document.getElementById("nav-menu");
const navClose = document.getElementById("nav-menu__close");

// Listen for a click on the hamburger button
hamburger.addEventListener("click", () => {
    // Toggle means: if the class is there, remove it. If it's not, add it.
    navMenu.classList.toggle("active");
});

// Listen for a click on the close button
navClose.addEventListener("click", () => {
    // Remove the active class to hide the menu
    navMenu.classList.remove("active");
});

// Visual Crossing Timeline Weather API example
// Fetches timeline data for a location using metric units, with output in JSON format
// Filters for windspeed, description, and icon weather elements

const API_KEY = "F2BLC7NXZZJ47C73JDURCMN5N";
const LOCATION = "Toronto"; // Change to your desired location
const UNIT_GROUP = "metric";
const INCLUDE = "days,hours";
const CONTENT_TYPE = "json";

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split("T")[0];
// Build the base URL
const baseUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(LOCATION)}/${today}`;
// Build query parameters
const params = new URLSearchParams({
    key: API_KEY,
    unitGroup: UNIT_GROUP,
    include: INCLUDE,
    contentType: CONTENT_TYPE,
});
const url = `${baseUrl}?${params.toString()}`;

async function fetchTimelineWeather() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            // Read and print response body for debugging
            const errorBody = await response.text();
            throw new Error(
                `Weather API request failed (${response.status}): ${errorBody}`,
            );
        }
        const data = await response.json();
        // Print the relevant portion of the returned data
        console.log("Timeline weather data:", data);
        // For example, print the first day's selected elements:
        if (data.days && data.days.length > 0) {
            console.log("First day's windspeed:", data.days[0].windspeed);
            console.log("First day's description:", data.days[0].description);
            console.log("First day's icon:", data.days[0].icon);
        }
    } catch (err) {
        console.error("Error fetching weather data:", err);
    }
}

fetchTimelineWeather();


const now = new Date();
const finalString = format(now, "EEEE, d MMMM yyyy '|' hh:mm a");

console.log(finalString);