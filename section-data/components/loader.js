
/* =========================================
   HAPROVEN COMPONENT LOADER
   HTML + CSS + JS | Reusable Sections
========================================= */

(() => {

    "use strict";

    const BASE = "/section-data/";

    const cssLoaded = new Set();
    const jsLoaded = new Map();
    const componentTasks = new WeakMap();

    /* COMPONENT NAME VALIDATION */
    function validName(name) {
        return /^[a-zA-Z0-9_-]+$/.test(name);
    }

    /* LOAD CSS ONCE */
    function loadCSS(name, styles) {

        styles.forEach(style => {

            const css = style.textContent.trim();
            if (!css) return;

            const key = name + ":" + css;

            if (cssLoaded.has(key)) return;

            const tag = document.createElement("style");

            tag.dataset.sectionStyle = name;
            tag.textContent = css;

            document.head.appendChild(tag);

            cssLoaded.add(key);

        });

    }

    /* LOAD EXTERNAL JS ONCE */
    function loadJS(src, sectionURL) {

        const url = new URL(src, sectionURL).href;

        if (jsLoaded.has(url)) {
            return jsLoaded.get(url);
        }

        const task = new Promise((resolve, reject) => {

            const script = document.createElement("script");

            script.src = url;
            script.onload = resolve;

            script.onerror = () => {
                jsLoaded.delete(url);
                reject(new Error("JS load failed: " + url));
            };

            document.body.appendChild(script);

        });

        jsLoaded.set(url, task);

        return task;

    }

    /* EXECUTE INLINE JS */
    function runInlineJS(element, scripts) {

        scripts.forEach(oldScript => {

            const script = document.createElement("script");

            script.__componentRoot = element;

            script.textContent = `
                (function(root) {
                    ${oldScript.textContent}
                })(document.currentScript.__componentRoot);
            `;

            document.body.appendChild(script);
            script.remove();

        });

    }

    /* LOAD COMPONENT */
    async function loadComponent(element) {

        if (element.dataset.loaded === "true") {
            return element;
        }

        if (componentTasks.has(element)) {
            return componentTasks.get(element);
        }

        const task = (async () => {

            const name = element.getAttribute("section-data");

            if (!validName(name)) {
                throw new Error("Invalid section name: " + name);
            }

            try {

                /* SECTION FILE URL */
                const sectionURL = new URL(
                    BASE + name + ".html",
                    location.origin
                ).href;

                /* FETCH HTML */
                const response = await fetch(sectionURL);

                if (!response.ok) {
                    throw new Error(name + ".html not found");
                }

                const html = await response.text();

                /* PARSE HTML */
                const doc = new DOMParser().parseFromString(
                    html,
                    "text/html"
                );

                /* EXTRACT CSS + JS */
                const styles = [...doc.querySelectorAll("style")];
                const scripts = [...doc.querySelectorAll("script")];

                styles.forEach(style => style.remove());
                scripts.forEach(script => script.remove());

                /* INSERT HTML */
                element.innerHTML = doc.body.innerHTML;

                /* LOAD CSS */
                loadCSS(name, styles);

                /* LOAD NESTED SECTIONS */
                const nested = [
                    ...element.querySelectorAll("[section-data]")
                ];

                await Promise.all(
                    nested.map(loadComponent)
                );

                /* EXTERNAL JS */
                for (const script of scripts) {

                    if (script.src) {
                        await loadJS(script.getAttribute("src"), sectionURL);
                    }

                }

                /* INLINE JS */
                runInlineJS(
                    element,
                    scripts.filter(script => !script.src)
                );

                element.dataset.loaded = "true";

                console.log("Section loaded:", name);

                return element;

            } catch (error) {

                console.error("Section error:", name, error);

                element.innerHTML = `
                    <div class="component-error">
                        Unable to load ${name} section.
                    </div>
                `;

                throw error;

            }

        })();

        componentTasks.set(element, task);

        return task;

    }

    /* FIND ALL SECTIONS */
    async function init(container = document) {

        const elements = [];

        if (container.matches?.("[section-data]")) {
            elements.push(container);
        }

        elements.push(
            ...container.querySelectorAll("[section-data]")
        );

        await Promise.allSettled(
            elements.map(loadComponent)
        );

    }

    /* PUBLIC API */
    window.HaprovenLoader = {

        init,

        load: loadComponent,

        reload(element) {
            element.dataset.loaded = "false";
            componentTasks.delete(element);
            return loadComponent(element);
        }

    };

    /* AUTO START */
    if (document.readyState === "loading") {

        document.addEventListener("DOMContentLoaded", () => init());

    } else {

        init();

    }

})();






/* 

<div section-data="header"></div>

<div section-data="footer"></div>

Esh me js me bar bar add karna nahi parta and ex. header.html
 jish me html+css+js ak sath add kar do and all 
 ak link me kishi bhi page me add kar sakte ho

*/
