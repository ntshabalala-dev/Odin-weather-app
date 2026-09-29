export default async function getUserCity() {
    const url = `https://ipapi.co/json/`;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.log("nuts");

            throw new Error(
                `IpInfo API request failed (${response.status}): ${errorBody}`,
            );
        }

        const data = await response.json();
        return data.city
    } catch (error) {
        //Default to London if error occurs
        return 'London'
    }
}
