import getIconMapping from "../Helpers/getIconMapping.js";

export async function loadForecastWeatherIcon(iconMapping, forecastDay) {
    // 1. Declare the variable outside so you can use it later
    let imageUrl = "";

    try {
        // 2. Try to import the image and destructure it immediately
        imageUrl = await import(`../Assets/weather_icons/${iconMapping}`);

        imageUrl = imageUrl.default;

        // 3. If successful, you can use the URL here
        console.log("Success! Image URL is:", imageUrl);
    } catch (error) {
        // 4. If anything goes wrong, catch the error and set a fallback
        console.error("Failed to load the image file:", error);
        imageUrl = `../Assets/sun.svg`;
    }

    // 5. Use the final URL (either the real one or the fallback)
    const icon = forecastDay.querySelector('.weather-forecast__icon img');
    //icon.className = iconMapping.split('.')[0];
    icon.src = imageUrl;

}

export async function loadForecastPrecipIcon(forecastDay) {
    let imageurl = await import('../Assets/air_conditions/Rain.svg')
    imageurl = imageurl.default;
    const precipIcon = forecastDay.querySelector('.weather-forecast__precipitation img')
    precipIcon.src = imageurl
}

export async function loadAirConditionIcons(row) {
    const data = [
        { "feels-like": "Temperature.svg" },
        { "wind": "Wind.svg" },
        { "precipitation": "Rain.svg" }
    ]

    data.forEach(async (element) => {

        const [[key, value]] = Object.entries(element);

        let imageUrl = await import(`../Assets/air_conditions/${value}`);

        imageUrl = imageUrl.default;
        const icon = row.querySelector(`.hourly-forecast__card #${key} img`);
        icon.src = imageUrl
    });
}

export async function loadHourlyDynamicImage(hourlyIcon, hourIdentifier) {
    let imageUrl = '';
    try {
        imageUrl = await import(`../Assets/weather_icons/${getIconMapping(hourlyIcon)}`);
        imageUrl = imageUrl.default;
    } catch (error) {
        console.error(`Failed to load the image file for ${hourIdentifier}:`, error);
        imageUrl = `../Assets/sun.svg`;
    }
    const icon = document.querySelector(`#${hourIdentifier}`);
    icon.src = imageUrl
}

export async function loadDynamicImage(iconMapping, selector) {
    // 1. Declare the variable outside so you can use it later
    let imageUrl = "";

    try {
        // 2. Try to import the image and destructure it immediately
        imageUrl = await import(`../Assets/weather_icons/${iconMapping}`);

        imageUrl = imageUrl.default;

        // 3. If successful, you can use the URL here
        console.log("Success! Image URL is:", imageUrl);
    } catch (error) {
        // 4. If anything goes wrong, catch the error and set a fallback
        console.error("Failed to load the image file:", error);
        imageUrl = `../Assets/sun.svg`;
    }

    // 5. Use the final URL (either the real one or the fallback)
    const icon = document.querySelector(selector);
    icon.className = iconMapping.split('.')[0];
    icon.src = imageUrl;
}
