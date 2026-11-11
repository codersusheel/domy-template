


/* =========================================
   HAPROVEN | HEADER CONTROLLER
========================================= */

(() => {

    const header = document.getElementById("siteHeader");
    if (!header) return;

    const menu = header.querySelector("#navMenu");
    const toggle = header.querySelector("#menuToggle");
    const theme = header.querySelector("#themeToggle");

    /* ACTIVE PAGE */

    const currentPath = location.pathname.replace(/\/+$/, "") || "/";

    menu?.querySelectorAll(".nav-link").forEach(link => {

        const linkPath = new URL(link.href, location.origin)
            .pathname.replace(/\/+$/, "") || "/";

        const isActive = linkPath === currentPath;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }

    });

    /* MOBILE MENU */

    const closeMenu = () => {

        menu?.classList.remove("is-open");
        toggle?.classList.remove("is-open");

        toggle?.setAttribute("aria-expanded", "false");
        toggle?.setAttribute("aria-label", "Open navigation");

    };

    toggle?.addEventListener("click", () => {

        const isOpen = menu.classList.toggle("is-open");

        toggle.classList.toggle("is-open", isOpen);
        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

    });

    /* CLOSE ON LINK CLICK */

    menu?.addEventListener("click", event => {

        if (event.target.closest(".nav-link")) {
            closeMenu();
        }

    });

    /* CLOSE OUTSIDE */

    document.addEventListener("click", event => {

        if (!header.contains(event.target)) {
            closeMenu();
        }

    });

    /* CLOSE ON ESCAPE */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });

    /* THEME TOGGLE */

    theme?.addEventListener("click", () => {

        const dark = document.documentElement
            .classList.toggle("dark");

        theme.setAttribute(
            "aria-label",
            dark ? "Switch to light theme" : "Switch to dark theme"
        );

    });

})();













/* =========================================
   HAPROVEN FOOTER ACTIVE PAGE
========================================= */

function updateFooterActive() {

    const currentPage = document.body.getAttribute("data-page");

    document.querySelectorAll(".footer-app a[data-page]").forEach(link => {

        const isActive = link.dataset.page === currentPage;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }

    });

}

/* CHECK AFTER FOOTER LOAD */
const footerObserver = new MutationObserver(() => {
    updateFooterActive();
});

footerObserver.observe(document.body, {
    childList: true,
    subtree: true
});

/* INITIAL CHECK */
updateFooterActive();

































