
export function createCards(establishments) {
    const cardContainer = document.getElementById("card-container");
    const populäraDejter = document.getElementById("populära")
    cardContainer.innerHTML = "";
    populäraDejter.innerHTML = "";

    const populärKort = document.createElement("div");
    populärKort.classList.add("p");
    populärKort.innerHTML = 
    `<div class="popular-bild" id="1"><img src="image/walk.jpg" alt="" class="Pimg"><h3>Vandring</h3><img src="image/spara.svg" alt="Spara" class="saveP"><img src="image/4stars.svg" alt="4 stjärnor" class="starsP"></div>
    
    <div class="popular-bild" id="7"><img src="image/dinner.jpg" class="Pimg"><h3>Resturang</h3><img src="image/spara.svg" alt="Spara" class="saveP"><img src="image/5stars.svg" alt="5 stjärnor" class="starsP"></div>
    
    <div class="popular-bild" id="10"><img src="image/spelkvall.png" class="Pimg"><h3>Spelkväll</h3><img src="image/spara.svg" alt="Spara" class="saveP"><img src="image/35stars.svg" alt="3,5 stjärnor" class="starsP"></div>
    
    <div class="popular-bild" id="8"><img src="image/bio.png" class="Pimg"><h3>Bio</h3><img src="image/spara.svg" alt="Spara" class="saveP"><img src="image/35stars.svg" alt="3,5 stjärnor" class="starsP"></div>
    
    <div class="popular-bild" id="19"><img src="image/bowling.svg" class="Pimg"><h3>Bowling</h3><img src="image/spara.svg" alt="Spara" class="saveP"><img src="image/35stars.svg" alt="3,5 stjärnor" class="starsP"></div>`;

    populäraDejter.append(populärKort);

    const savePopDate = populärKort.querySelectorAll(".saveP");
    savePopDate.forEach(btn  => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            
            if (btn.classList.contains("activePop")) {
                btn.src = "image/spara.svg";
                btn.classList.remove("activePop");
            } else {
                btn.src = "image/sparaD.svg";
                btn.classList.add("activePop");
            }
        });
    });

    const vandring = document.getElementById("1").addEventListener("click", () =>{
        window.location.href= `detaljsida/detalj.html?id=1`;
    });
    const resturang = document.getElementById("7").addEventListener("click", () =>{
        window.location.href= `detaljsida/detalj.html?id=7`;
    });
    const spelKväll = document.getElementById("10").addEventListener("click", () =>{
        window.location.href= `detaljsida/detalj.html?id=10`;
    });
    const bio = document.getElementById("8").addEventListener("click", () =>{
        window.location.href= `detaljsida/detalj.html?id=8`;
    });
    const bowling = document.getElementById("19").addEventListener("click", () => {
        window.location.href = `detaljsida/detalj.html?id=19`;
    });
    

    // ksk ha id istället för class på knappen
    for (const d of establishments) {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.innerHTML = `
        <div id = "card-left">
        <img class="kort-bild" src="${d.image}" alt="">
        <h3>${d.name}</h3>
        </div>
        <img src="image/spara.svg" alt="Spara" class="save">
        <p class="place">${d.in}</p>
        <img class="rating" src="${d.rating}" alt=""> `;


        const saveBtn = cardDiv.querySelector(".save");
        const message = document.getElementById("message");
        // detta p elementet ("message") ska hamna synligt vid klick

        saveBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // så man inte öppnar detaljsidan
                
            if (saveBtn.classList.contains("active")) {
            saveBtn.src = "image/spara.svg";
            saveBtn.classList.remove("active");

            } else {
                saveBtn.src = "image/sparaD.svg";
                saveBtn.classList.add("active");
                saveTheDate(d, message);
            }

        });

        cardDiv.addEventListener("click", () => {
            window.location.href = `detaljsida/detalj.html?id=${d.id}`;
        });

        cardContainer.append(cardDiv);
    }
}
export function saveTheDate(d, message) {
    
        const saved = JSON.parse(localStorage.getItem("saved")) || [];

            const exists = saved.find(item => item.id === d.id);

            if (!exists) {
                saved.push(d);
                localStorage.setItem("saved", JSON.stringify(saved));
                message.textContent = "Dejten har sparats!";
                message.style.color = "green";
            } else {
                message.textContent = "Dejten är redan sparad!";
                message.style.color = "orange";
            }

            setTimeout(()=>{
                message.textContent = "";
            }, 3000 );
            console.log(message);

        }
