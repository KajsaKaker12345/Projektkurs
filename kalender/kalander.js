const kalender = document.querySelector(".kalender");
const btn = document.getElementById("menu-icon");
const nav = document.getElementById("hidden-nav");
const nextContainer = document.getElementById("nästa-dejt");


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
for(let day = 1; day <= 31; day++){
    console.log(day);
    kalender.innerHTML += `<div class="day">${day}</div>`;
}

function showNextDate() {
    nextContainer.innerHTML = "";
    for(const date of doDate) {
    const nextDiv = document.createElement("div");
    nextDiv.classList.add("next-date");

    nextDiv.innerHTML = `
    <img src="../${date.image}" alt="${date.name}">
    <h3>${date.name}</h3><button class="remove-btn">Ta bort</button>
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
