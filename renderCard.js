
export function createCards(establishments) {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    for (const d of establishments) {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.innerHTML = `
        <img class="kort-bild" src="${d.image}" alt="">
        <h3>${d.name}</h3><button class="save"><img src="spara.svg" alt="Spara"></button>
        `;

        const saveBtn = cardDiv.querySelector(".save");

        saveBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // så man inte öppnar detaljsidan

            const saved = JSON.parse(localStorage.getItem("saved")) || [];

            const exists = saved.find(item => item.id === d.id);

            if (!exists) {
                saved.push(d);
                localStorage.setItem("saved", JSON.stringify(saved));
            }
        });

        cardDiv.addEventListener("click", () => {
            window.location.href = `detaljsida/detalj.html?id=${d.id}`;
        });

        cardContainer.append(cardDiv);
    }
}
