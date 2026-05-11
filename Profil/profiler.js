const btn = document.getElementById("menu-icon");
const nav = document.getElementById("hidden-nav");
const nextContainer = document.getElementById("pågående");
const slutfördaContainer = document.getElementById("slutförda");
const kryssBtn = document.querySelector("#kryss");

let doDate = [];
let doneDate = [];

        try{
       const storedDate = localStorage.getItem("doDate");

       if(storedDate && storedDate !== "") {
        doDate = JSON.parse(storedDate);
         }

        }catch(error) {
            console.error("Error parsing doDate from localStorage:", error);
            localStorage.removeItem("doDate");
        }

         try{
       const storedDate = localStorage.getItem("doneDate");

       if(storedDate && storedDate !== "") {
        doneDate = JSON.parse(storedDate);
         }

        }catch(error) {
            console.error("Error parsing doneDate from localStorage:", error);
            localStorage.removeItem("doneDate");
        }

function showNextDate() {
    nextContainer.innerHTML = "";
    slutfördaContainer.innerHTML = "";
    for(const date of doDate) {
    const nextDiv = document.createElement("div");
    nextDiv.classList.add("next-date");

    nextDiv.innerHTML = `
    <h3>${date.name}</h3><button class="done"><img id="klar-img" src="../image/klar.svg" alt="klar med dejten"> Klar</button>
    `;

    const klarBtn = nextDiv.querySelector(".done");
    const message = document.querySelector(".message");

    const done = doneDate.includes(date.name);

    if(done) {
        slutfördaContainer.append(nextDiv);
        klarBtn.style.display = "none";
    }else {
        nextContainer.append(nextDiv);
    }

    klarBtn.addEventListener("click", () => {
        message.classList.toggle("active");

        doneDate.push(date.name);
        localStorage.setItem("doneDate", JSON.stringify(doneDate));

        slutfördaContainer.append(nextDiv);
        klarBtn.style.display = "none";
    });
    kryssBtn.addEventListener("click", () => {
        message.classList.remove("active");
    });
}
}
showNextDate();

btn.addEventListener("click", () => {
    nav.classList.toggle("active");
});