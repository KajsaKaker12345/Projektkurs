
export function createCards(establishments) {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

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
            console.log(message);

        }
