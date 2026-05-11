const btn = document.getElementById("menu-icon");
const nav = document.getElementById("hidden-nav");

btn.addEventListener("click", () => {
    nav.classList.toggle("active");
});

const response = await fetch("../dates.json");
const data = await response.json();

const cardContainer = document.getElementById("card-container");
const newCard = document.getElementById("new-btn");
randomizeDates(data);

newCard.addEventListener("click", () => randomizeDates(data));

function randomizeDates(data) {
    cardContainer.innerHTML = "";

    const randomDates = [];

     for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * data.length);
    randomDates.push(data[randomIndex]);
     }
    for (const item of randomDates) {
    const element = document.createElement("div");
    element.classList.add("slump-dejt");
    element.addEventListener("click", () => {
        element.classList.toggle("flipped");
    });

    element.innerHTML = `
    <div class="card-inner">

    <div class="card-header">
    <img src="../image/slumpKlöver.svg" alt="">
    </div>

    <div class="card-front">
    <img src="../${item.image}" alt="">
    <h3>${item.name}</h3>
    </div>
    
    </div>`;
    
    
    cardContainer.append(element);
    }
    

}