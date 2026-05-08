import { createCards } from "../renderCard.js";

const btn = document.getElementById("menu-icon");
const nav = document.getElementById("hidden-nav");

btn.addEventListener("click", () => {
    nav.classList.toggle("active");
});
console.log(nav);
let saved = [];

try{
 saved = JSON.parse(localStorage.getItem("saved")) || [];
}catch(error){
    saved = [];
}
createCards(saved);