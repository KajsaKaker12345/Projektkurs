const kalender = document.querySelector(".kalender");
const btn = document.getElementById("menu-icon");
const nav = document.getElementById("hidden-nav");
const nextContainer = document.getElementById("nästa-dejt");
const plannedContainer = document.getElementById("planerade-dejter");


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

let planeradDejt = JSON.parse(localStorage.getItem("planeradDejt")) || [];

    for (let day = 1; day <= 31; day++){
    console.log(day);
    const dagElem = document.createElement("div");
    dagElem.classList.add("day");
    dagElem.textContent = day;

    const planerad = planeradDejt.find(item => {const date = new Date(item.date); return date.getDate() === day});

    if (planerad) {
        dagElem.innerHTML += `<img id="dejt-heart"src="../image/HjärtaTomt.svg" alt="Hjärta">`;
        dagElem.title = planerad.name;
    }
    kalender.append(dagElem);
}

for (const plan of planeradDejt) {
    const planen = document.createElement("div");
    planen.classList.add("planerad-dejt");
    planen.innerHTML = `
    <h3>${plan.name}</h3><p>${plan.date}</p>
    `;
    plannedContainer.append(planen);
}

function showNextDate() {
    nextContainer.innerHTML = "";
    for(const date of doDate) {
    const nextDiv = document.createElement("div");
    nextDiv.classList.add("next-date"); 

    nextDiv.innerHTML = `
    <p>Datum</p><h3>${date.name}</h3><button class="remove-btn">Ta bort</button><button class="read-more"><a href="../detaljsida/detalj.html?id=${date.id}">Läs mer</a></button>
    `;

    const removeBtn = nextDiv.querySelector(".remove-btn");

    removeBtn.addEventListener("click", () => {
        doDate = doDate.filter(item => item.id !== date.id);
        localStorage.setItem("doDate", JSON.stringify(doDate));
        showNextDate();
    });
    
    nextContainer.append(nextDiv);
}
}

btn.addEventListener("click", () => {
    nav.classList.toggle("active");
});

showNextDate();

