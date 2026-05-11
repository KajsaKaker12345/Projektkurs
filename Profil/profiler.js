const btn = document.getElementById("menu-icon");
const nav = document.getElementById("hidden-nav");
const nextContainer = document.getElementById("pågående");

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

function showNextDate() {
    nextContainer.innerHTML = "";
    for(const date of doDate) {
    const nextDiv = document.createElement("div");
    nextDiv.classList.add("next-date");

    nextDiv.innerHTML = `
    <h3>${date.name}</h3><button class="done"><img id="klar-img" src="../image/klar.svg" alt="klar med dejten"> Klar</button>
    `;
    
    nextContainer.append(nextDiv);
}
}
showNextDate();

btn.addEventListener("click", () => {
    nav.classList.toggle("active");
});