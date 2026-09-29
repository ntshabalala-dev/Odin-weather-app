
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export default function showErrorToast(message) {
    // 1. Detect if the device is mobile (standard breakpoint is 768px)
    const isMobile = window.innerWidth <= 768;

    // 2. Configure position variables dynamically
    // Desktop: Top-Right | Mobile: Bottom-Center
    const toastGravity = isMobile ? "bottom" : "top";
    const toastPosition = isMobile ? "center" : "right";

    // 3. Launch the toast with conditional configurations
    Toastify({
        text: `⚠️ ${message}`,
        duration: -1,
        gravity: toastGravity,      // top or bottom
        position: toastPosition,  // left, center or right
        close: true,                // Adds a dismiss 'x' button
        className: "error-toast",   // Custom CSS class anchor
        style: {
            // Material design error red color
            background: "linear-gradient(to right, #ff5f6d, #ffc371)",
            color: "#ffffff",
            // Give mobile a wider, cleaner layout
            borderRadius: isMobile ? "8px" : "4px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
        }
    }).showToast();
}