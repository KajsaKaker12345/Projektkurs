const btn = document.querySelectorAll(".menu-icon");
const nav = document.getElementById("hidden-nav");
const nextContainer = document.getElementById("pågående");
const slutfördaContainer = document.getElementById("slutförda");
const kryssBtn = document.querySelector("#kryss");

const img = document.getElementById("dejt-status");
let imgNumber = Number(localStorage.getItem("imgNumber")) || 0; //knapp räkning
let fullHeartCount = Number(localStorage.getItem("fullHeartCount")) || 0;
// räkning för fullföljda hjärtan
const fullHeart = document.getElementById("fullHeart");

// rendera fullföljda hjärtan men också säga vilket stort hjärta som ska visas
if (imgNumber > 0) {
    img.src = `../imageStatus/status-hjärta${imgNumber}.svg`
} else {
    img.src = "../imageStatus/HjärtaTomt.svg";
}

for (let i = 0; i < fullHeartCount; i++) {
    const heartImage = document.createElement("img");
    heartImage.src = "../image/HjärtaFyllt.svg";
    heartImage.alt = "fullt hjärta";
    fullHeart.append(heartImage);
}
// spara
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
    <div>
    <img class="dateKlar" src="../${date.image}"</img>
    <h3>${date.name}</h3>
    </div>
    <button class="done"><img id="klar-img" src="../image/klar.svg" alt="klar med dejten"> Klar</button>
    `;


    const klarBtn = nextDiv.querySelector(".done");
    const message = document.querySelector(".message");

    const done = doneDate.includes(date.name);

    if(done) {

        const completedDiv = document.createElement("div");
        completedDiv.classList.add("completed");

        completedDiv.innerHTML = `<img id="bigImg" src="../${date.image}" alt="Bild på dejten"></img>
        <img id="doneCirkel" src="../image/klar.svg" alt="klar med dejten">
        <h3 id="onTopName">${date.name}</h3>`;

        slutfördaContainer.append(completedDiv);

        klarBtn.style.display = "none";

    }else {
        nextContainer.append(nextDiv);
    }

    // klarknappen för att stänga pågående dejten
    klarBtn.addEventListener("click", () => {
        nextDiv.innerHTML = "";
        message.classList.toggle("active");

        doneDate.push(date.name);
        localStorage.setItem("doneDate", JSON.stringify(doneDate));

        const completedDiv = document.createElement("div");
        completedDiv.classList.add("completed");

         completedDiv.innerHTML = `<img id="bigImg" src="../${date.image}" alt="Bild på dejten"></img>
        <img id="doneCirkel" src="../image/klar.svg" alt="klar med dejten">
        <h3 id="onTopName">${date.name}</h3>`;

        slutfördaContainer.append(completedDiv);//
        klarBtn.style.display = "none";

        imgNumber++;
        
        if (imgNumber > 5) {
        imgNumber = 0;
        img.src = `../imageStatus/HjärtaTomt.svg`;
    }   else if (imgNumber === 5) {
        img.src = `../imageStatus/status-hjärta${imgNumber}.svg`;
        const text = document.createElement("p");
        text.id = "textMsg";
        text.textContent = "Nu har ni fyllt ett helt hjärta! Fortsätt samla hjärtan för att få belöningar, såsom rabattkoder till dejterna!";
        message.append(text);

        const heartImage = document.createElement("img");
        heartImage.id = "heartImage";
        heartImage.alt = "Fullt hjärta";
        heartImage.src = "../image/HjärtaFyllt.svg";
        fullHeart.append(heartImage);

        fullHeartCount++;
        localStorage.setItem("fullHeartCount", fullHeartCount);
    }
    else {
        img.src = `../imageStatus/status-hjärta${imgNumber}.svg`
        }
        localStorage.setItem("imgNumber", imgNumber);
        
    });

    // kryssknapp för att stänga meddelande knapp
    kryssBtn.addEventListener("click", () => {
        message.classList.remove("active");
        const text = document.getElementById("textMsg");

        if (text) {
            text.remove();
        }

        if (imgNumber === 5) {
            imgNumber = 0;
            img.src = "../imageStatus/HjärtaTomt.svg";
            localStorage.setItem("imgNumber", imgNumber);
        
        
        }
        /*const text = document.getElementById("text");
        const heartImage = document.getElementById("heartImage");

        if (imgNumber > 5) {
        imgNumber = 0;
        img.src = `../imageStatus/HjärtaTomt.svg`;
        message.classList.remove("active");
    } */
    });
}
}






//localStorage.removeItem("doneDate")
console.log(doneDate)
showNextDate();
btn.forEach(menuBtn => {
     menuBtn.addEventListener("click", () => {
        nav.classList.toggle("active");
});
});