import { createCards } from "../renderCard.js";

const btn = document.querySelectorAll(".menu-icon");
const nav = document.getElementById("hidden-nav");
const card = document.getElementById("card-container");
const message = document.getElementById("message");

function skapaKort(){
    
    card.innerHTML = "";

     if(saved.length === 0){
            card.innerHTML = `<p>Du har för tillfället inga sparade dejter....</p>`;
            card.classList.add("noDates")
            return;
        }

    for(const save of saved){
        const kortDiv = document.createElement("div");
        kortDiv.classList.add("card");
        kortDiv.innerHTML = `
        <img class="kort-bild" src="../${save.image}" alt="Dejt ${save.name} Bild">
        <div id="kort-info"><h3>${save.name}</h3><button id="läsMer"><a href="../detaljsida/detalj.html?id=${save.id}">Läs mer</a></button></div><img class="delete" src="../image/trash.svg" alt="Tabort dejt knapp"></img>
        `;

        const deleteBtn = kortDiv.querySelector(".delete");

        deleteBtn.addEventListener("click", () => {
            saved = saved.filter(item => item.id !== save.id);
            localStorage.setItem("saved", JSON.stringify(saved));
            
            message.textContent = "Dejten har tagits bort från dina sparade dejter.....";// lägg till en tid på meddelandet så att det inte visas hela tiden utan bara typ 3 sek
            message.style.display = "flex";
            console.log(message.style.display);

            skapaKort();

            setTimeout(() => {
                message.style.display = "none";
            }, 3000);
        });

        card.appendChild(kortDiv);
    }
}

btn.forEach(menuBtn => {
     menuBtn.addEventListener("click", () => {
        nav.classList.toggle("active");
});
});

console.log(nav);
let saved = [];

try{
    saved = JSON.parse(localStorage.getItem("saved")) || [];
}catch(error){
    saved = [];
}
skapaKort();
