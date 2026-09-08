
const iconMapping = {
    "clear-day": "sunny.svg",
    "clear-night": "clearnight.svg",
    "cloudy": "cloudy.svg",
    "fog": "foggy.svg",
    "partly-cloudy-day": "partlycloudy.svg",
    "partly-cloudy-night": "partlycloudynight.svg",
    "rain": "lightrain.svg",
    "showers-day": "sunshowers.svg",
    "showers-night": "lightrain.svg",
    "snow": "snow.svg",
    "snow-showers-day": "snowshowers.svg",
    "snow-showers-night": "snowshowers.svg",
    "thunder": "thunderstorm.svg",
    "thunder-rain": "thunderstorm.svg",
    "thunder-showers-day": "thunderstorm.svg",
    "thunder-showers-night": "thunderstorm.svg",
    "thundersnow": "thundersnow.svg",
    "sleet": "snow.svg", // Fallback to snow
    "wind": "windy.svg",

    // Mixed weather fallbacks
    "rain-snow": "snow.svg",
    "rain-snow-showers-day": "snowshowers.svg",
    "rain-snow-showers-night": "snowshowers.svg",
    "hail": "thunderstorm.svg"
};

export default function getIconMapping(icon) {
    return iconMapping[icon] || 'unknown.svg'
}

// How to use it safely:
// const finalIcon = iconMapping[apiResponse.icon] || "unknown.svg";
