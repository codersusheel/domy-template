
document.addEventListener("DOMContentLoaded", () => {

    const components = {
        header: "/section/header.html",
        slider: "/section/slider.html",
        footer: "/section/footer.html"
    };

    Object.entries(components).forEach(([id, path]) => {

        const element = document.getElementById(id);

        if (!element) return;

        fetch(path)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${path}`);
                }
                return response.text();
            })
            .then(html => {
                element.innerHTML = html;

                document.dispatchEvent(
                    new CustomEvent(`${id}:loaded`)
                );
            })
            .catch(error => {
                console.error(error);
            });

    });

});







function setFooterYear() {
    document.querySelectorAll(".footer-year").forEach(el => {
        el.textContent = new Date().getFullYear();
    });
}

setFooterYear();
setTimeout(setFooterYear, 500);
setTimeout(setFooterYear, 1500);










/* =========================================
   HAPROVEN | HEADER CONTROLLER
   External HTML + Responsive Navigation
========================================= */

(() => {

    function initHeader() {

        const header = document.getElementById("siteHeader");

        if (!header || header.dataset.initialized) return;

        header.dataset.initialized = "true";

        const menu = header.querySelector("#navMenu");
        const menuToggle = header.querySelector("#menuToggle");

        const more = header.querySelector("#navMore");
        const moreToggle = header.querySelector("#moreToggle");

        const themeToggle = header.querySelector("#themeToggle");

        /* =====================================
           ACTIVE PAGE
        ===================================== */

        const currentPath =
            location.pathname.replace(/\/+$/, "") || "/";

        header.querySelectorAll(".nav-link").forEach(link => {

            const path = new URL(link.href, location.origin)
                .pathname.replace(/\/+$/, "") || "/";

            const active = path === currentPath;

            link.classList.toggle("active", active);

            if (active) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }

        });

        /* =====================================
           MOBILE MENU
        ===================================== */

        function closeMenu() {

            menu?.classList.remove("is-open");
            menuToggle?.classList.remove("is-open");

            menuToggle?.setAttribute("aria-expanded", "false");
            menuToggle?.setAttribute("aria-label", "Open navigation");

        }

        menuToggle?.addEventListener("click", () => {

            const open = menu.classList.toggle("is-open");

            menuToggle.classList.toggle("is-open", open);

            menuToggle.setAttribute("aria-expanded", String(open));

            menuToggle.setAttribute(
                "aria-label",
                open ? "Close navigation" : "Open navigation"
            );

            if (!open) closeMore();

        });

        /* =====================================
           MORE DROPDOWN
        ===================================== */

        function closeMore() {

            more?.classList.remove("is-open");

            moreToggle?.setAttribute("aria-expanded", "false");

        }

        /* MOBILE CLICK */

        moreToggle?.addEventListener("click", () => {

            if (window.matchMedia("(max-width: 850px)").matches) {

                const open = more.classList.toggle("is-open");

                moreToggle.setAttribute(
                    "aria-expanded",
                    String(open)
                );

            }

        });

        /* DESKTOP HOVER */

        more?.addEventListener("mouseenter", () => {

            if (window.matchMedia("(min-width: 851px)").matches) {

                moreToggle?.setAttribute("aria-expanded", "true");

            }

        });

        more?.addEventListener("mouseleave", () => {

            if (window.matchMedia("(min-width: 851px)").matches) {

                moreToggle?.setAttribute("aria-expanded", "false");

            }

        });

        /* =====================================
           NAVIGATION CLICK
        ===================================== */

        menu?.addEventListener("click", event => {

            if (event.target.closest(".nav-link")) {

                closeMenu();
                closeMore();

            }

        });

        /* =====================================
           OUTSIDE CLICK
        ===================================== */

        document.addEventListener("click", event => {

            if (!header.contains(event.target)) {

                closeMenu();
                closeMore();

            }

        });

        /* =====================================
           ESCAPE KEY
        ===================================== */

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                closeMenu();
                closeMore();

            }

        });

        /* =====================================
           THEME TOGGLE
        ===================================== */

        themeToggle?.addEventListener("click", () => {

            const dark =
                document.documentElement.classList.toggle("dark");

            themeToggle.setAttribute(
                "aria-label",
                dark ? "Switch to light theme" : "Switch to dark theme"
            );

        });

    }

    /* =====================================
       EXTERNAL HEADER DETECTION
    ===================================== */

    if (document.getElementById("siteHeader")) {

        initHeader();

    } else {

        const observer = new MutationObserver(() => {

            if (document.getElementById("siteHeader")) {

                initHeader();

                observer.disconnect();

            }

        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

    }

})();
