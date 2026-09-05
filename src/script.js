import "../src/main.css";

// Grab the button and the menu from the HTML
const hamburger = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-menu__close');

// Listen for a click on the hamburger button
hamburger.addEventListener('click', () => {
    // Toggle means: if the class is there, remove it. If it's not, add it.
    navMenu.classList.toggle('active');
});

// Listen for a click on the close button
navClose.addEventListener('click', () => {
    // Remove the active class to hide the menu
    navMenu.classList.remove('active');
});
