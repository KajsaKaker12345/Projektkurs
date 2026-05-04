/* import { getFetch } from "./fetch.js";

async function getData() {
    const data = await getFetch("establishment", "getall");
    console.log(data);
    createCards(data.payload);
}*/
import { makeClick } from "./fetch.js";

const response = await fetch("dates.json");
const data = await response.json();
createCards(data);

function createCards(establishments) {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    for (const d of establishments) {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.innerHTML = `
        <img class="kort-bild" src="${d.image}" alt="">
        <h3>${d.name}</h3>
        `;
        cardDiv.addEventListener("click", () => {
            makeClick(d);
            console.log("text");
        });
        
        cardContainer.append(cardDiv);
    }
}