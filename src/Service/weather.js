export default async function fetchTimelineWeather(location) {
    // Visual Crossing Timeline Weather API example
    // Fetches timeline data for a location using metric units, with output in JSON format
    // Filters for windspeed, description, and icon weather elements

    const API_KEY = "F2BLC7NXZZJ47C73JDURCMN5N";
    const LOCATION = location; // Change to your desired location
    const UNIT_GROUP = "metric";
    const INCLUDE = "days,hours";
    const CONTENT_TYPE = "json";

    // Get today's date in YYYY-MM-DD format
    const startDate = "next6days";
    // Build the base URL
    const baseUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(LOCATION)}/${startDate}`;
    // Build query parameters
    const params = new URLSearchParams({
        key: API_KEY,
        unitGroup: UNIT_GROUP,
        include: INCLUDE,
        contentType: CONTENT_TYPE,
    });
    const url = `${baseUrl}?${params.toString()}`;

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

        return data;
    } catch (err) {
        console.error("Error fetching weather data:", err);
        throw err;
    }
}