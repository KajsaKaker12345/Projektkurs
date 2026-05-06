import { createCards } from "./renderCard.js";

const response = await fetch("dates.json");
const data = await response.json();
createCards(data);

const btn = document.getElementById("menu-icon");
const nav = document.getElementById("hidden-nav");

btn.addEventListener("click", () => {
    nav.classList.toggle("active");
});


