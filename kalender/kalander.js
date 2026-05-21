const kalender = document.querySelector(".kalender");
const btn = document.querySelectorAll(".menu-icon");
const nav = document.getElementById("hidden-nav");
const nextContainer = document.getElementById("nästa-dejt");
const plannedContainer = document.getElementById("planerade-dejter");

let currentMånad = new Date().getMonth();
let currentÅr = new Date().getFullYear();

let planeradDejt = JSON.parse(localStorage.getItem("planeradDejt")) || [];

function kalenderKort(){
    const struktur = document.getElementById("kalender-struktur");
    const månad = document.getElementById("månad");


    struktur.innerHTML= "";

    const första = new Date(currentÅr, currentMånad, 1);
    const sista = new Date(currentÅr, currentMånad + 1, 0);

    const dagar = sista.getDate();

    const månaderna = [
        "Januari",
        "Februari",
        "Mars",
        "April",
        "Maj",
        "Juni",
        "Juli",
        "Augusti",
        "September",
        "Oktober",
        "November",
        "December"
    ];
    månad.textContent = `${månaderna[currentMånad]} ${currentÅr}`;

    for (let day = 1; day <= dagar; day++){
    const dagElem = document.createElement("div");
    dagElem.classList.add("day");
    dagElem.innerHTML = `<h3>${day}</h3>`;
    
    const planerad = planeradDejt.find(item => {const date = new Date(item.date); return date.getFullYear() === currentÅr && date.getMonth() === currentMånad && date.getDate() === day});

    if (planerad) {
        dagElem.innerHTML += `<img id="dejt-heart"src="../image/HjärtaFyllt.svg" alt="Hjärta">`;
        dagElem.title = planerad.name;
    }

    struktur.append(dagElem);
}
}
function kortPlanerad(){

    plannedContainer.innerHTML = "";


    for (const plan of planeradDejt) {
    const planen = document.createElement("div");
    planen.classList.add("planerad-dejt");
    planen.innerHTML = `
    <p>${plan.date}</p><h3>${plan.name}</h3><button class="remove-btn"></button><button class="read-more"><a href="../detaljsida/detalj.html?id=${plan.id}">Läs mer</a></button>
    `;



const removeBtn = planen.querySelector(".remove-btn");

removeBtn.innerHTML = `<img src="../image/trash.svg" alt="Ta bort">`;

removeBtn.addEventListener("click", () => {
        planeradDejt = planeradDejt.filter(item => item.id !== plan.id);
        localStorage.setItem("planeradDejt", JSON.stringify(planeradDejt));
        kalenderKort();
        kortPlanerad();
    });
    plannedContainer.append(planen);
}
}

const nästa = document.getElementById("nästa").addEventListener("click", ()=>{
    currentMånad++;

    if(currentMånad > 11){
        currentMånad = 0;
        currentÅr++;
    }
    kalenderKort();
});

const förra = document.getElementById("förra").addEventListener("click", ()=>{
    currentMånad--;

    if(currentMånad < 0){
        currentMånad = 11;
        currentÅr--;
    }
    kalenderKort();

});


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


btn.forEach(menuBtn => {
     menuBtn.addEventListener("click", () => {
        nav.classList.toggle("active");
});
});

kalenderKort();
kortPlanerad();
