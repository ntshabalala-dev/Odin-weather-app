import { format } from "date-fns";

const now = new Date();

export default {
    "date": format(now, "EEEE, d MMMM yyyy"),
    "time": format(now, "hh:mm a"),
    "timestamp": Date.now()
}