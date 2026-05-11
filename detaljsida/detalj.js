import { makeFetchElement } from "../data.js";
import { getFetch } from "../fetch.js";
import { makeFilter } from "../data.js";
import { makeLocalElement } from "../data.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const response = await fetch("../dates.json");
const categories = await response.json();

const category = categories.find(c => String(c.id) === id);

createDetails(category);


// funktionen för att skapa elementen och hämta data beroende på typen
async function createDetails(category) {
    const detailsContainer = document.getElementById("container");
    const headerContainer = document.getElementById("head");

    if (!category) {
        detailsContainer.innerHTML = "<p>Dejt inte hittad.</p>";
        return;
    }

    headerContainer.innerHTML = `<a href="../index.html"><img src="../image/pil.svg" alt="tillbaka pil"></a><h1>${category.name}</h1><img src="../spara.svg" alt="spara ikon">`;
    detailsContainer.innerHTML = `
        <img src="../${category.image}" alt="${category.name}">
        <p>${category.description}</p>
    `; 

    const buttonsContainer = document.getElementById("vald-dejt");
    const dateBtn = document.createElement("button");
    const calenderBtn = document.createElement("button");
    dateBtn.textContent = "Gör dejt idag";
    calenderBtn.textContent = "Lägg i kalender";
    buttonsContainer.append(dateBtn, calenderBtn);

    let data;

    if (category.type === "local") {
        const response = await fetch(`../${category.filename}`);
        data = await response.json();
        makeLocalElement(data);
    }

    else if (category.type === "api") {
        data = await getFetch(category);
        makeFetchElement(data.payload);
        makeFilter(data.payload);
    }
    
    else {
        data = category;
    }


}