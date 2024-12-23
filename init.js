document.addEventListener("DOMContentLoaded", () => {
    handleClientLoad();
});

document.addEventListener("DOMContentLoaded", function () {
    const dateFrom = document.getElementById("date-from");
    const dateTo = document.getElementById("date-to");
    const today = new Date().toISOString().split("T")[0];

    // Configura la fecha mínima para ambos campos
    dateFrom.setAttribute("min", today);
    dateTo.setAttribute("min", today);

    // Ajusta la fecha mínima del campo "Dato til" en función de "Dato fra"
    dateFrom.addEventListener("change", function () {
        dateTo.setAttribute("min", dateFrom.value);
    });
});
