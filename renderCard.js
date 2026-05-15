
export function createCards(establishments) {
    const cardContainer = document.getElementById("card-container");
    const populäraDejter = document.getElementById("populära")
    cardContainer.innerHTML = "";
    populäraDejter.innerHTML = "";

    const populärKort = document.createElement("div");
    populärKort.classList.add("p");
    populärKort.innerHTML = 
    `<div class="popular-bild" id="1"><img src="image/walk.jpg" alt=""><h3>Vandring</h3></div>
    <div class="popular-bild" id="7"><img src="image/dinner.jpg"><h3>Resturang</h3></div>
    <div class="popular-bild" id="10"><img src="image/spelkvall.png"><h3>Spelkväll</h3></div>
    <div class="popular-bild" id="8"><img src="image/bio.png"><h3>Bio</h3></div>
    <div class="popular-bild" id="19"><img src="image/bowling.svg"><h3>Bowling</h3></div>`;


    populäraDejter.append(populärKort);

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
        <img class="kort-bild" src="${d.image}" alt="">
        <h3>${d.name}</h3><img src="image/spara.svg" alt="Spara" class="save">   `;



        const saveBtn = cardDiv.querySelector(".save");
        const message = document.getElementById("message");
        // detta p elementet ("message") ska hamna synligt vid klick

        saveBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // så man inte öppnar detaljsidan
                saveTheDate(d, message);

            

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
