/*import { createCards } from "./renderCard.js";
const response = await fetch("../data.json");
const data = await response.json();
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
    
}*/