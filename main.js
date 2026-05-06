import { createCards } from "./renderCard.js";

const response = await fetch("dates.json");
const data = await response.json();
createCards(data);

const placeInput = document.getElementById("place");
const form = document.getElementById("form");


form.addEventListener("change", filterList);

function filterList() {
    const placeValue = placeInput.value;
    let filtered = data;

    if (placeValue !== "alla") {
        filtered = data.filter(d => d.in === placeValue);
    }

    createCards(filtered);
    
}

const btn = document.getElementById("menu-icon");
const nav = document.getElementById("hidden-nav");

btn.addEventListener("click", () => {
    nav.classList.toggle("active");
});


