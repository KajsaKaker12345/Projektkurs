const response = await fetch("dates.json");
const data = await response.json();
createCards(data);

export function createCards(establishments) {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    for (const d of establishments) {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.innerHTML = `
        <img class="kort-bild" src="${d.image}" alt="">
        <h3>${d.name}</h3><img class="save" src="spara.svg" alt="Spara">
        `;
        cardDiv.addEventListener("click", () => {
            window.location.href = `detaljsida/detalj.html?id=${d.id}`;
        });
        
        cardContainer.append(cardDiv);
    }
}