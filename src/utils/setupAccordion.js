import Plotly from "plotly.js-dist-min";

export function setupAccordion() {

    const headers =
        document.querySelectorAll(".accordion-header");

    headers.forEach(header => {

        if (header.dataset.initialized) return;
        header.dataset.initialized = "true";

        header.addEventListener("click", () => {

            const item = header.parentElement;

            // Toggle this section instead of closing all others
            item.classList.toggle("active");

            // Give the CSS animation time to finish before resizing Plotly
            setTimeout(() => {

                const plot =
                    item.querySelector(".plot");

                if (plot) {
                    Plotly.Plots.resize(plot);
                }

            }, 250);

        });

    });

}