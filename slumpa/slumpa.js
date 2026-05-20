const btn = document.querySelector(".menu-icon");
const nav = document.getElementById("hidden-nav");
const startGIF = document.getElementById("startaGIF");
const GIF = document.getElementById("gifen");
const stilla = document.getElementById("stillBild");

btn.addEventListener("click", () => {
    nav.classList.toggle("active");
});

const response = await fetch("../dates.json");
const data = await response.json();

const cardContainer = document.getElementById("card-container");

function randomizeDates(data) {
    cardContainer.innerHTML = "";

    const randomDates = [];

     for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * data.length);
    randomDates.push(data[randomIndex]);
     }
    for (const item of randomDates) {
    const element = document.createElement("div");
    element.classList.add("slump-dejt");
    element.classList.add("active");
    element.addEventListener("click", () => {
        element.classList.toggle("flipped");
    });

    element.innerHTML = `
    <div class="card-inner">

    <div class="card-header">
    <img id="klöver-kort" src="../image/Slumpande.svg" alt="">
    </div>

    <div class="card-back">
    <img src="../${item.image}" alt="">
    <h3>${item.name}</h3>
    </div>
    
    </div>`;
    
    
    cardContainer.append(element);
    }
    

}


startGIF.addEventListener("click", ()=>{

    GIF.classList.toggle("active");
    stilla.classList.toggle("active");
    

    cardContainer.innerHTML ="";



    setTimeout(() => {
        GIF.classList.remove("active");
        stilla.classList.remove("active");
        stilla.classList.add("hidden")

        randomizeDates(data);

        const allaKort = document.querySelectorAll(".slump-dejt");

        allaKort.forEach((card, index) => {
            setTimeout(()=>{
                card.classList.add("flipped");
            }, index * 400);
        });
        
    }, 5000);

}); 