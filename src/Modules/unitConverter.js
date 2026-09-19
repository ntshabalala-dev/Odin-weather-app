export default function initUnitConverter() {
    const tempSymbols = document.querySelector("#temperature-details #metric");

    tempSymbols.addEventListener("click", (e) => {
        const target = e.target;
        const selected = document.querySelector("#metric .selected");
        if (
            target.classList.contains("selected") ||
            (target.id !== "fahrenheit" && target.id !== "celsius")
        ) {
            return;
        }

        selected.classList.remove("selected");
        target.classList.add("selected");

        if (target.id === "fahrenheit") {
            const metricUnits = document.querySelectorAll(".metric-celcius");
            const metricKms = document.querySelectorAll(".metric-km");

            metricKms.forEach((metricKm) => {
                const mKm = +metricKm.textContent.trim().split("k")[0];
                metricKm.textContent = `${Math.round(mKm * 0.621371)}mi/h`;
                metricKm.className = "imperial-mph";
            });

            metricUnits.forEach((metricUnit) => {
                const c = +metricUnit.textContent.trim().split("°")[0];
                const calc = Math.round(c * 1.8 + 32);

                metricUnit.textContent =
                    metricUnit.id !== "value" ? `${calc}°` : `${calc}`;
                metricUnit.className = "imperial-fahrenheit";
            });
        } else {
            const imperialUnits = document.querySelectorAll(".imperial-fahrenheit");
            const imperialMphs = document.querySelectorAll(".imperial-mph");

            imperialMphs.forEach((imperialMph) => {
                const iMph = +imperialMph.textContent.trim().split("m")[0];
                imperialMph.textContent = `${Math.round(iMph * 1.609344)}km/h`;
                imperialMph.className = "metric-km";
            });

            imperialUnits.forEach((imperialUnit) => {
                const f = +imperialUnit.textContent.trim().split("°")[0];
                const calc = Math.round(((f - 32) * 5) / 9);

                imperialUnit.textContent =
                    imperialUnit.id !== "value" ? `${calc}°` : `${calc}`;
                imperialUnit.className = "metric-celcius";
            });
        }
    });
}
