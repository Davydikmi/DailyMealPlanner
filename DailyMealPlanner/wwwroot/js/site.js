
// Запрос для подсчета калорий пользователя
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("calc-btn").addEventListener("click", async () => {
        const weight = parseFloat(document.getElementById("weight").value);
        const height = parseFloat(document.getElementById("height").value);
        const age = parseInt(document.getElementById("age").value);
        const activity = parseFloat(document.getElementById("activity").value);

        // отправка запроса на сервер для подсчета дневных каллорий
        const response = await fetch("/Home/CalculateCalories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ weight, height, age, activity })
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById("calorieResult").innerText = `Your daily calorie rate: ${data.calories} kcal`;
        } else {
            document.getElementById("calorieResult").innerText = "Calculation failed.";
        }
    });
});

// Функция для поисковой строки продуктов
function filterCatalog() {
    const query = document.getElementById("search").value.toLowerCase();
    const categories = document.querySelectorAll(".category");

    categories.forEach(category => {
        const products = category.querySelectorAll(".food-item");
        let hasVisibleProduct = false;

        products.forEach(product => {
            const productText = product.textContent.toLowerCase();
            if (productText.includes(query)) {
                product.style.display = "block";
                hasVisibleProduct = true;
            } else {
                product.style.display = "none";
            }
        });

        if (hasVisibleProduct) {
            category.style.display = "block";
        } else {
            category.style.display = "none";
        }
    });
}


// -------- DRAG & DROP --------
function onDragStart(event) {
    event.dataTransfer.setData("text/html", event.target.outerHTML);
}
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

            const html = e.dataTransfer.getData("text/html");
            const node = document.createRange().createContextualFragment(html).firstChild;

            node.classList.add("dropped");
            node.setAttribute("draggable", "false");

            node.addEventListener("dblclick", () => node.remove());

            area.appendChild(node);
        });
    });
}

//-------- РАСКРЫТИЕ КАТЕГОРИЙ НА ПРОДУКТЫ --------
function toggleProducts(header) {
    const productsDiv = header.nextElementSibling;

    if (productsDiv.classList.contains('hidden')) {
        productsDiv.classList.remove('hidden');
        productsDiv.classList.add('visible');
    } else {
        productsDiv.classList.remove('visible');
        productsDiv.classList.add('hidden');
    }
}

function setupCategoryClickHandlers() {
    const headers = document.querySelectorAll(".category-header");

    headers.forEach(header => {
        header.addEventListener("click", function () {
            toggleProducts(header);
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setupCategoryClickHandlers();
    setupDragAndDrop();
});


// Обновление КБЖУ при изменении граммовки продукта
function updateNutrition(input) {
    const grams = parseFloat(input.value) || 0;
    const container = input.closest(".food-item");

    const protein = parseFloat(container.dataset.protein);
    const fats = parseFloat(container.dataset.fats);
    const carbs = parseFloat(container.dataset.carbs);
    const calories = parseFloat(container.dataset.calories);

    container.querySelector(".protein").textContent = (protein * grams / 100.0).toFixed(1);
    container.querySelector(".fats").textContent = (fats * grams / 100.0).toFixed(1);
    container.querySelector(".carbs").textContent = (carbs * grams / 100).toFixed(1);
    container.querySelector(".calories").textContent = (calories * grams / 100.0).toFixed(0);
}


// Вывод данных обо всех приемах пищи за день
function exportPlan() {
    const meals = ["breakfast", "lunch", "dinner"];
    let html = "<h3>🧾 Detailed Breakdown</h3>";

    let dayTotal = {
        calories: 0,
        protein: 0,
        fats: 0,
        carbs: 0,
        grams: 0
    };

    meals.forEach(mealId => {
        const mealDiv = document.getElementById(mealId);
        const items = mealDiv.querySelectorAll(".food-item");

        let mealTotal = {
            calories: 0,
            protein: 0,
            fats: 0,
            carbs: 0,
            grams: 0
        };

        items.forEach(item => {
            const grams = parseFloat(item.querySelector("input").value) || 0;
            const protein = parseFloat(item.querySelector(".protein").textContent) || 0;
            const fats = parseFloat(item.querySelector(".fats").textContent) || 0;
            const carbs = parseFloat(item.querySelector(".carbs").textContent) || 0;
            const calories = parseFloat(item.querySelector(".calories").textContent) || 0;

            // суммирование для статистики по приемам пищи
            mealTotal.grams += grams;
            mealTotal.protein += protein;
            mealTotal.fats += fats;
            mealTotal.carbs += carbs;
            mealTotal.calories += calories;

            // суммирование для дневной статистики
            dayTotal.grams += grams;
            dayTotal.protein += protein;
            dayTotal.fats += fats;
            dayTotal.carbs += carbs;
            dayTotal.calories += calories;
        });

        html += `
            <p><strong>${mealDiv.querySelector("h3").textContent}:</strong><br>
            Грамм: ${mealTotal.grams.toFixed(0)} г,
            Б: ${mealTotal.protein.toFixed(1)} г,
            Ж: ${mealTotal.fats.toFixed(1)} г,
            У: ${mealTotal.carbs.toFixed(1)} г,
            Ккал: ${mealTotal.calories.toFixed(0)}</p>
        `;
    });

    html += `
        <hr>
        <p><strong>ИТОГО за день:</strong><br>
        Грамм: ${dayTotal.grams.toFixed(0)} г,
        Б: ${dayTotal.protein.toFixed(1)} г,
        Ж: ${dayTotal.fats.toFixed(1)} г,
        У: ${dayTotal.carbs.toFixed(1)} г,
        Ккал: ${dayTotal.calories.toFixed(0)}</p>
    `;

    const breakdown = document.getElementById("mealBreakdown");
    breakdown.innerHTML = html;
    breakdown.classList.remove("hidden");
}
