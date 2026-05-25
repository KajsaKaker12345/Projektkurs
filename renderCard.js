
export function createCards(establishments) {
    const cardContainer = document.getElementById("card-container");
    const populäraDejter = document.getElementById("populära")
    cardContainer.innerHTML = "";
    populäraDejter.innerHTML = "";

    const populärKort = document.createElement("div");
    populärKort.classList.add("p");
    populärKort.innerHTML = 
    `<div class="popular-bild" id="16"><img src="image/sipandpaint.jpg" alt="" class="Pimg"><h3>Sip and Paint</h3><img src="image/spara.svg" alt="Spara" class="saveP"><p class="place">Hemma</p><img src="image/45stars.svg" alt="4,5 stjärnor" class="starsP"></div>
    
    <div class="popular-bild" id="7"><img src="image/dinner.jpg" class="Pimg"><h3>Resturang</h3><img src="image/spara.svg" alt="Spara" class="saveP"><p class="place">Inomhus</p><img src="image/5stars.svg" alt="5 stjärnor" class="starsP"></div>
    
    <div class="popular-bild" id="11"><img src="image/wii.jpg" class="Pimg"><h3>TV-spel</h3><img src="image/spara.svg" alt="Spara" class="saveP"><p class="place">Hemma</p><img src="image/45stars.svg" alt="4,5 stjärnor" class="starsP"></div>
    
    <div class="popular-bild" id="12"><img src="image/hotel.png" class="Pimg"><h3>Hotell</h3><img src="image/spara.svg" alt="Spara" class="saveP"><p class="place">Inomhus</p><img src="image/5stars.svg" alt="5 stjärnor" class="starsP"></div>
    
    <div class="popular-bild" id="15"><img src="image/cook.jpg" class="Pimg"><h3>Matlagning</h3><img src="image/spara.svg" alt="Spara" class="saveP"><p class="place">Hemma</p><img src="image/5stars.svg" alt="5 stjärnor" class="starsP"></div>`;

    populäraDejter.append(populärKort);

    const savePopDate = populärKort.querySelectorAll(".saveP");
    savePopDate.forEach(btn  => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();

            const popDiven = btn.closest(".popular-bild");

            const cardId = Number(popDiven.id);

            const selectedDate = establishments.find(item => item.id === cardId);

            const message = document.getElementById("message");
            
            if (btn.classList.contains("activePop")) {
                btn.src = "image/spara.svg";
                btn.classList.remove("activePop");
            } else {
                btn.src = "image/sparaD.svg";
                btn.classList.add("activePop");
                saveTheDate(selectedDate, message);
            }
        });
    });

    const sip = document.getElementById("16").addEventListener("click", () =>{
        window.location.href= `detaljsida/detalj.html?id=16`;
    });
    const resturang = document.getElementById("7").addEventListener("click", () =>{
        window.location.href= `detaljsida/detalj.html?id=7`;
    });
    const tvSpel = document.getElementById("11").addEventListener("click", () =>{
        window.location.href= `detaljsida/detalj.html?id=11`;
    });
    const cooking = document.getElementById("15").addEventListener("click", () =>{
        window.location.href= `detaljsida/detalj.html?id=15`;
    });
    const hotel = document.getElementById("12").addEventListener("click", () => {
        window.location.href = `detaljsida/detalj.html?id=12`;
    });
    

    // ksk ha id istället för class på knappen
    for (const d of establishments) {
        let saveImage = "image/spara.svg";
        let saveClass = "save";

        const saved = JSON.parse(localStorage.getItem("saved")) || [];
        const exists = saved.find(item => item.id === d.id);


        if(exists){
            saveImage = "image/sparaD.svg";
            saveClass = "save active";
        }
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.innerHTML = `
        <img class="kort-bild" src="${d.image}" alt="">
        <h3>${d.name}</h3>
        <p class="place">${d.in}</p>
        <img src="${saveImage}" alt="Spara" class="${saveClass}">
        <img class="rating" src="${d.rating}" alt=""> `;


        const saveBtn = cardDiv.querySelector(".save");
        // detta p elementet ("message") ska hamna synligt vid klick
         const message = document.getElementById("message");

        saveBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // så man inte öppnar detaljsidan
                
            if (saveBtn.classList.contains("active")) {
            saveBtn.src = "image/spara.svg";
            saveBtn.classList.remove("active");

            let saved = JSON.parse(localStorage.getItem("saved")) || [];

            saved = saved.filter(item => item.id !== d.id);

            localStorage.setItem("saved", JSON.stringify(saved));

           

            } else {
                saveBtn.src = "image/sparaD.svg";
                saveBtn.classList.add("active");
                saveTheDate(d, message);
            }
            console.log(saved);
        });

        cardDiv.addEventListener("click", () => {
            window.location.href = `detaljsida/detalj.html?id=${d.id}`;
        });

        cardContainer.append(cardDiv);
    }
}
export function saveTheDate(d, message) {
    
        let saved = JSON.parse(localStorage.getItem("saved")) || [];

            const exists = saved.find(item => item.id === d.id);

            if (!exists) {
                d.isSaved = true;
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
