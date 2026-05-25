const searchBtn = document.getElementById("sök-icon");
const searchInput = document.getElementById("search-input");
const searchContainer = document.getElementById("search-container");

searchBtn.addEventListener("click", () => {
    searchInput.classList.toggle("active");
    searchContainer.classList.toggle("active");

});

const response = await fetch("dates.json");
const data = await response.json();

import { createCards } from "./renderCard.js";

const input = document.getElementById("search-input");
const resultat = document.getElementById("search-resultat");
const error = document.getElementById("card-container");


input.addEventListener("input", () => {
    const value = input.value.toLowerCase();
    const filtered = data.filter(d => d.name.toLowerCase().includes(value));
    resultat.innerHTML = "";
    error.textContent = "";

        createCards(filtered);
    

    if(filtered.length === 0){
        error.textContent = "Inga resultat";
        resultat.innerHTML = "";
    }
});
