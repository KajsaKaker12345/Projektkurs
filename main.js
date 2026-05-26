import { createCards } from "./renderCard.js";

const response = await fetch("dates.json");
const data = await response.json();
createCards(data);

const placeInput = document.getElementById("place");
const priceInput = document.getElementById("price");
const priceSign = document.getElementById("priceValue");
const form = document.getElementById("form");

const btn = document.querySelectorAll(".menu-icon");
const nav = document.getElementById("hidden-nav");

btn.forEach(menuBtn => {
     menuBtn.addEventListener("click", () => {
        nav.classList.toggle("active");
});
});
  


form.addEventListener("change", filterList);

function filterList() {

    const placeValue = placeInput.value;
    const priceValue = priceInput.value;
    let filtered = data;

    if (priceValue == 0) {
        priceSign.textContent = "Gratis";
    }
    if (priceValue == 1) {
            priceSign.textContent = "$";
        }

        if (priceValue == 2) {
            priceSign.textContent = "$$";
        }
        if (priceValue == 3) {
            priceSign.textContent = "$$$";
        }

    if (placeValue !== "alla") {
        filtered = data.filter(d => d.in === placeValue);
    }
    filtered = filtered.filter(d => {

        if (priceValue == 0) {
            return d.price === "gratis";
        }
        if (priceValue == 1) {
            return d.price === "gratis" || d.price === "låg";
        }

        if (priceValue == 2) {
            return d.price === "gratis" || d.price === "låg" || d.price === "medel";
        }
        if (priceValue == 3) {
            return d.price === "gratis" || d.price === "låg" || d.price === "medel" || d.price === "hög";
        }

    });
    if (filtered.length === 0) {
        const container = document.getElementById("card-container");
        container.innerHTML = "<p>Det finns tyvärr inga dejter som matchar din sök filtrering! </p>";
        return;
    }

    createCards(filtered);
    
}

