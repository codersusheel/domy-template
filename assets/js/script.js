

/* ================= MOBILE MENU ================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

function closeMenu() {
    menuToggle.classList.remove("active");
    navMenu.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
}

menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
    );
});

// Close after clicking a link
navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
});

// Close when clicking outside
document.addEventListener("click", event => {
    if (!event.target.closest(".header-container")) {
        closeMenu();
    }
});

// Close on Escape
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

// Close if screen becomes desktop
window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
        closeMenu();
    }
});


/* ================= ACTIVE LINK ================= */

const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";

navMenu.querySelectorAll(".nav-link").forEach(link => {
    const linkPath = new URL(link.href).pathname.replace(/\/+$/, "") || "/";

    if (linkPath === currentPath) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
    }
});


/* ================= HEADER SCROLL ================= */

const siteHeader = document.getElementById("siteHeader");

function updateHeader() {
    siteHeader.classList.toggle("scrolled", window.scrollY > 10);
}

window.addEventListener("scroll", updateHeader, { passive: true });

updateHeader();


/* ================= THEME TOGGLE ================= */

const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

function applyTheme(theme) {
    root.setAttribute("data-theme", theme);

    themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
    );
}

const savedTheme = localStorage.getItem("theme");

applyTheme(
    savedTheme ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
);

themeToggle.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
});
