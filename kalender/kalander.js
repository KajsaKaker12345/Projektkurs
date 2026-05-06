const kalender = document.querySelector(".kalender");

for(let day = 1; day <= 31; day++){
    console.log(day);
    kalender.innerHTML += `<div class="day">${day}</div>`;
}