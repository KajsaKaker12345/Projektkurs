const btn = document.getElementById("menu-icon");
const nav = document.getElementById("hidden-nav");

const searchBtn = document.getElementById("sök-icon");
const searchInput = document.getElementById("search-input");

searchBtn.addEventListener("click", () => {
    searchInput.classList.toggle("active");
});

btn.addEventListener("click", () => {
    nav.classList.toggle("show");
});



