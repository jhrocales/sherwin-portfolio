/* ==================================
Toggle Style Switcher
===================================== */
const styleSwitcherToggler = document.querySelector(".style-switcher-toggler");
styleSwitcherToggler.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
})

// hide style - switcher on scroll
window.addEventListener("scroll", () => {
    if(document.querySelector(".style-switcher").classList.contains("open"))
    {
        document.querySelector(".style-switcher").classList.remove("open");
    }
})


/* ==================================
Theme Colors (Skin) Logic
===================================== */
const alternateStyles = document.querySelectorAll(".alternate-style");

/**
 * Sets the active color style and saves it to localStorage.
 * @param {string} color - The title of the color style to activate (e.g., "color-1").
 */
function setActiveStyle(color) {
    // 1. Save the chosen color to localStorage
    localStorage.setItem("active-color", color);

    // 2. Activate the chosen stylesheet
    alternateStyles.forEach((style) => {
        if (color === style.getAttribute("title")) {
            style.removeAttribute("disabled");
        } else {
            style.setAttribute("disabled", "true");
        }
    })
}


/* ==================================
Theme Light and Dark Mode Logic
===================================== */
const dayNight = document.querySelector(".day-night");

dayNight.addEventListener("click", () => {
    // Toggle the sun/moon icon
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");

    // Toggle the 'dark' class on the body
    document.body.classList.toggle("dark");

    // Save the user's preference to localStorage
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});


/* ===================================================================
   Checks localStorage on Page Load to Apply Saved User Preferences
====================================================================== */
window.addEventListener("load", () => {
    // ---- CHECK FOR SAVED THEME (LIGHT/DARK) ----
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        dayNight.querySelector("i").classList.add("fa-sun");
    } else {
        // Default to light mode if nothing is stored or if it's "light"
        document.body.classList.remove("dark"); // Ensure it's not dark
        dayNight.querySelector("i").classList.add("fa-moon");
    }

    // ---- CHECK FOR SAVED ACTIVE COLOR (SKIN) ----
    const savedColor = localStorage.getItem("active-color");
    if (savedColor) {
        setActiveStyle(savedColor); // Apply the saved color
    }
    // If no color is saved, it will just use your default stylesheet.
});