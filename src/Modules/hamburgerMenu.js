import deleteButtonSvg from "../Assets/clear.svg";
import { setDateTime } from "../Helpers/getDateAndTime.js";
import {
    generateWeatherForecast
} from "../Modules/search.js";

let menuButton = null;
let isActive = false;
let navMenu = null;
const handleNavFocusOut = (event) => navFocusOut(event);

function toggleMenuState() {
    isActive = !isActive;
    if (isActive) {
        navMenu.classList.toggle("active", isActive);
        document.addEventListener("click", handleNavFocusOut);
    } else {
        document.removeEventListener("click", handleNavFocusOut)
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

function closeMenu() {
    if (!isActive) return;
    navMenu.classList.remove("active");
    isActive = false;
    menuButton.setAttribute("aria-expanded", String(isActive));
    document.removeEventListener("click", handleNavFocusOut)
}

export function createCity(location) {
    const navMenuContainer = document.querySelector('.nav-menu ul')
    const li = document.createElement('li')
    li.id = 'nav-menu__location';
    const anchor = document.createElement('a')
    const deleteButton = document.createElement('button')
    deleteButton.type = 'button';
    deleteButton.id = 'delete-location'
    deleteButton.innerHTML = `<img id="delete-location-img" src="${deleteButtonSvg}"alt="delete location button">`
    deleteButton.dataset.location = location;
    anchor.textContent = location;
    li.append(anchor, deleteButton)
    navMenuContainer.appendChild(li);

    anchor.addEventListener('click', async () => {
        await generateWeatherForecast(location);
        setDateTime();

        document.querySelectorAll(".is-loading").forEach((element) => {
            element.classList.toggle("is-loading");
        });
        closeMenu();
    })

    deleteButton.addEventListener('click', () => {
        const currentLocations = JSON.parse(localStorage.getItem('locations'))
        const removed = currentLocations.filter((currentLocation) => {
            return currentLocation !== location
        });
        localStorage.setItem("locations", JSON.stringify(removed))
        navMenuContainer.removeChild(li)
    })
}

function navFocusOut(event) {
    // Only close when the click is outside both the menu and the toggle button.
    //console.log(event.target, navMenu.contains(event.target));
    const target = event.target;
    const isDeleteButton = target.id === 'delete-location-img' || target.id === 'delete-location'

    if (!isActive) return;
    if (isDeleteButton) return;
    if (navMenu.contains(target)) return;
    if (menuButton?.contains(target)) return;
    closeMenu();
}

export function registerHamburgerMenuButtons(buttonSelectors) {
    navMenu = document.getElementById("nav-menu");
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
