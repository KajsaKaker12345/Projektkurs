const btn = document.getElementById("menu-icon");
const nav = document.getElementById("hidden-nav");

btn.addEventListener("click", () => {
    nav.classList.toggle("show");
});

const searchBtn = document.getElementById("sök-icon");
const searchInput = document.getElementById("search-input");

searchBtn.addEventListener("click", () => {
    searchInput.classList.toggle("active");
});

