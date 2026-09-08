let menuButton = null;
let isActive = false;
const navMenu = document.getElementById("nav-menu");

function toggleMenuState(e) {
    isActive = !isActive;
    if (isActive) {
        navMenu.classList.toggle("active", isActive);

    } else {
        navMenu.classList.remove("active");
        isActive = false;
    }

    menuButton.setAttribute("aria-expanded", String(isActive));
}

export default function registerHamburgerMenuButtons(buttonSelectors) {
    buttonSelectors.forEach(buttonSelector => {
        menuButton = document.querySelector(buttonSelector);

        if (!menuButton) {
            console.error(`Hamburger button with selector "${buttonSelector}" not found.`);
            return;
        }
        // Set initial accessibility state
        if (buttonSelector === '#hamburger-btn')
            menuButton.setAttribute('aria-expanded', 'false');

        menuButton.addEventListener('click', toggleMenuState)
    });
}
