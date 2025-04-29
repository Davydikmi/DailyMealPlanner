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

            // Убираем возможность снова перетаскивать внутри meal
            node.classList.add("dropped");
            node.setAttribute("draggable", "false");

            // Разрешаем клик для удаления
            node.addEventListener("click", () => node.remove());

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