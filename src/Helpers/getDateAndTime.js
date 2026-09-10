import { format } from "date-fns";

export function setDateTime() {
    const now = new Date();

    const date = document.querySelector("#location__date-time #date");
    const time = document.querySelector("#location__date-time #time");

    date.textContent = format(now, "EEEE, d MMMM yyyy");
    time.textContent = format(now, "hh:mm a");
}

export function getDayOfTheWeek(date) {
    return format((new Date(date)), "EEEE");
}
