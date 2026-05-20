import { createCards } from "../renderCard.js";

const btn = document.querySelector(".menu-icon");
const nav = document.getElementById("hidden-nav");
const card = document.getElementById("card-container");
const message = document.getElementById("message");

function skapaKort(){
    card.innerHTML = "";
    for(const save of saved){
        const kortDiv = document.createElement("div");
        kortDiv.classList.add("card");
        kortDiv.innerHTML = `
        <img class="kort-bild" src="../${save.image}" alt="">
        <h3>${save.name}</h3><button class="delete">Tabort</button>
        `;

        const deleteBtn = kortDiv.querySelector(".delete");

        deleteBtn.addEventListener("click", () => {
            saved = saved.filter(item => item.id !== save.id);
            localStorage.setItem("saved", JSON.stringify(saved));
            kortDiv.remove();
            message.textContent = "Dejten har tagits bort från dina sparade dejter.";// lägg till en tid på meddelandet så att det inte visas hela tiden utan bara typ 3 sek
            message.style.color = "red";
        });

        card.appendChild(kortDiv);
    }
}

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
