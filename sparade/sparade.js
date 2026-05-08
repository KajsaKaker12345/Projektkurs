import { createCards } from "../renderCard.js";

const btn = document.getElementById("menu-icon");
const nav = document.getElementById("hidden-nav");
const card = document.getElementById("card-container");

function skapaKort(){
    for(const save of saved){
        const kortDiv = document.createElement("div");
        kortDiv.classList.add("card");
        kortDiv.innerHTML = `
        <img class="kort-bild" src="../${save.image}" alt="">
        <h3>${save.name}</h3><button class="delete">Tabort</button>
        `;
        card.appendChild(kortDiv);
    }
}

const deleteBtn = document.querySelectorAll(".delete");

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
skapaKort();
