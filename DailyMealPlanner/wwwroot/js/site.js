function calculateCalories() {
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);
    const age = parseFloat(document.getElementById("age").value);
    const activity = parseFloat(document.getElementById("activity").value);

    if (!weight || !height || !age || !activity) return;

    const bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.330 * age;
    const dailyCalories = Math.round(bmr * activity);

    document.getElementById("calorieResult").innerText = `Your daily calorie rate: ${dailyCalories} kcal`;
}

function filterCatalog() {
    const query = document.getElementById("search").value.toLowerCase();
    document.querySelectorAll(".food-item").forEach(item => {
        const name = item.textContent.toLowerCase();
        item.style.display = name.includes(query) ? "block" : "none";
    });
}

function exportPlan() {
    alert("Here you'd trigger export logic (PDF, XML, etc).");
}

// -------- DRAG & DROP --------

document.addEventListener("DOMContentLoaded", () => {
    setupDragAndDrop();
});

function setupDragAndDrop() {
    document.querySelectorAll(".food-item").forEach(item => {
        item.setAttribute("draggable", "true");
        item.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text/plain", e.target.outerHTML);
        });
    });

    document.querySelectorAll(".meal").forEach(area => {
        area.addEventListener("dragover", e => {
            e.preventDefault();
            area.style.background = "#e0f7fa";
        });

        area.addEventListener("dragleave", () => {
            area.style.background = "#f9f9f9";
        });

        area.addEventListener("drop", e => {
            e.preventDefault();
            area.style.background = "#f9f9f9";
            const html = e.dataTransfer.getData("text/plain");
            const node = document.createRange().createContextualFragment(html).firstChild;
            node.classList.add("dropped");
            node.setAttribute("draggable", "false");
            node.addEventListener("click", () => node.remove()); // allow remove on click
            area.appendChild(node);
        });
    });
}
