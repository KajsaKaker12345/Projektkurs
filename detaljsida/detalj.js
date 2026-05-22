import { makeFetchElement } from "../data.js";
import { loadMap } from "./kartan.js";
import { saveTheDate } from "../renderCard.js";
import { getFetch } from "../fetch.js";
import { makeFilter } from "../data.js";
import { makeLocalElement } from "../data.js";
import { makeOwnElement } from "../data.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const response = await fetch("../dates.json");
const categories = await response.json();
//console.log("ladda kategorier:", categories);

const category = categories.find(c => String(c.id) === id);

createDetails(category);
const message = document.getElementById("message");

// funktionen för att skapa elementen och hämta data beroende på typen
async function createDetails(category) {
    const detailsContainer = document.getElementById("container");
    const headerContainer = document.getElementById("head");

    if (!category) {
        detailsContainer.innerHTML = "<p>Dejt inte hittad.</p>";
        return;
    }

    headerContainer.innerHTML = `<a href="../index.html"><img src="../image/pil.svg" alt="tillbaka pil"></a><h1>${category.name.toUpperCase()}</h1><img src="../image/spara.svg" alt="image/spara ikon" id="save">`;
    
    detailsContainer.innerHTML = `
        <img src="../${category.image}" alt="${category.name}">
        <img src="../${category.rating}" alt="rating" class="stars">
        <p>${category.description}</p>
    `; 

    const saveBtn = document.getElementById("save");
    saveBtn.addEventListener("click", () => {
        saveTheDate(category, message);

         if (saveBtn.classList.contains("active")) {
            saveBtn.src = "../image/spara.svg";
            saveBtn.classList.remove("active");

            } else {
                saveBtn.src = "../image/sparaD.svg";
                saveBtn.classList.add("active");
                saveTheDate(d, message);
            }
    });
    
    const buttonsContainer = document.getElementById("vald-dejt");

    const dejtBox = document.createElement("div");
    dejtBox.classList.add("dejt-box", "hidden");

    const dateInput = document.createElement("input");
    dateInput.type = "date";

    const confirmBtn = document.createElement("button");
    confirmBtn.textContent = "Bekräfta";

    dejtBox.append(dateInput, confirmBtn);

    const dateBtn = document.createElement("button");
    const calenderBtn = document.createElement("button");
    dateBtn.textContent = "Gör dejt idag";
    calenderBtn.textContent = "Lägg i kalender";
    buttonsContainer.append(dejtBox, dateBtn, calenderBtn);

    let data;

    if (category.type === "local") {
        const response = await fetch(`../${category.filename}`);
        data = await response.json();
        makeLocalElement(data);
        makeFilter(data, makeLocalElement);
        loadMap(data);
    }

    else if (category.type === "api") {
        data = await getFetch(category);
        makeFetchElement(data.payload);
        makeFilter(data.payload, makeFetchElement);
        loadMap(data.payload);
    }
    
    else {
        data = category;
        makeOwnElement(data);
    }
// gör dejt idag 
    dateBtn.addEventListener("click", (e) => {
        e.preventDefault();
        let doDate = [];

        try{
       const storedDate = localStorage.getItem("doDate");

       if(storedDate && storedDate !== "") {
        doDate = JSON.parse(storedDate);
         }

        }catch(error) {
            console.error("Error parsing doDate from localStorage:", error);
            localStorage.removeItem("doDate");
        }

       const exists = doDate.find(item => item.id === category.id);

         if (!exists) {

        doDate.push(category);

        localStorage.setItem("doDate", JSON.stringify(doDate));
        console.log(doDate);
        message.textContent = "Du har startat en dejt, kolla i din kalender!";
        message.style.color = "green";
         }
    });
// lägg i kalender 
    calenderBtn.addEventListener("click", () => {

        dejtBox.classList.remove("hidden");

        dateBtn.disabled = true;
        calenderBtn.disabled = true;


        confirmBtn.addEventListener("click", () => {
            dejtBox.classList.add("hidden");
            dateBtn.disabled = false;
            calenderBtn.disabled = false;
            message.textContent = "Dejten har lagts till i din kalender!";
            message.style.color = "green";
            if (!dateInput.value) {
                return;
             }
             let planeradDejt = JSON.parse(localStorage.getItem("planeradDejt")) || [];
             const finns = planeradDejt.find(item => item.id === category.id);

                if (!finns) {
                    planeradDejt.push({ id: category.id, name: category.name, date: dateInput.value });
                    localStorage.setItem("planeradDejt", JSON.stringify(planeradDejt));
                    console.log(planeradDejt);
                }
                dejtBox.remove();
            });
    });
    if(category.slug){
    document.body.classList.add(category.slug);
    const section = document.querySelector(`.${category.slug}`);

    if (section) {
    section.style.display = "block";
    }
    }
}
//github secrets 