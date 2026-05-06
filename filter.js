const response = await fetch("../data.json");
const data = await response.json();
const placeInput = document.getElementById("place");
const form = document.getElementById("field");
const cardContainer = document.getElementById("card-container");

function renderList(list) {

}