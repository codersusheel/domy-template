
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













/* 

<div id="header"></div>

<div id="footer"></div>

*/ 
