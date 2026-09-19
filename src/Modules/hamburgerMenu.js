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

function addCityToNavMenu() {
    document.querySelector('main').addEventListener('searchPerformed', (event) => {
        console.log(`Adding to Nav: ${event.detail.searchTerm}`);
        createCity(event.detail.searchTerm)
    });
}

export function createCity(location) {
    const navMenu = document.querySelector('.nav-menu ul')
    const li = document.createElement('li')
    const anchor = document.createElement('a')
    anchor.textContent = location;
    li.appendChild(anchor)
    navMenu.appendChild(li);
}

export function registerHamburgerMenuButtons(buttonSelectors) {
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
    addCityToNavMenu();
}
