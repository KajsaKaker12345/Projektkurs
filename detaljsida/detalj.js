import { makeFetchElement } from "../data.js";
import { getFetch } from "../fetch.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const response = await fetch("../dates.json");
const categories = await response.json();

const category = categories.find(c => String(c.id) === id);

createDetails(category);

async function createDetails(category) {
    const detailsContainer = document.getElementById("container");

    if (!category) {
        detailsContainer.innerHTML = "<p>Dejt inte hittad.</p>";
        return;
    }

    detailsContainer.innerHTML = `
        <img src="../${category.image}" alt="${category.name}">
        <h2>${category.name}</h2>
        <p>${category.description}</p>
    `; 

    let data;

    if (category.type === "local") {
        const response = await fetch(`../${category.filename}`);
        data = await response.json();
    }

    else if (category.type === "api") {
        data = await getFetch(category);
        makeFetchElement(data.payload);
    }
    
    else {
        data = category;
    }


}