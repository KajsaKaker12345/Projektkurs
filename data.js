import { loadMap } from "./detaljsida/kartan.js";

// rendera lokal data
export function makeLocalElement(data) {
    const map = document.getElementById("map");
    map.innerHTML = "";
    const filterContainer = document.getElementById("filters");

    for (const item of data) {
        const element = document.createElement("div");
        element.classList.add("map-item");

        element.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        `;
        map.append(element);
    }
}
// rendera data från api
export async function makeFetchElement(data) {
    const map = document.getElementById("map");
    map.innerHTML = "";
    const filterContainer = document.getElementById("filters");

    for (const item of data) {
        const element = document.createElement("div");
        element.classList.add("map-item");
        const priceOrRating = item.price_range ? `Prisklass: ${item.price_range}kr` : item.avg_dinner_pricing ? `Genomsnittligt pris: ${item.avg_dinner_pricing}kr` : `Recentioner: ${Number(item.rating)}/5`;

        
        let city = item.city;
        let province = item.province;

        if (!city && item.lat && item.lng) {
            city = await convertToCity(item.lat, item.lng);
        }
        element.innerHTML = `
            <h3>${item.name}</h3>
            <p>${priceOrRating}</p>
            <p>${city}, ${province}</p>
        `;
        map.append(element);
    }

}
// funktion konvertera kordinater till stad  
async function convertToCity(lat, lng) {
    const response = fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}localityLanguage=en
`);
    return response.then(res => res.json())
        .then(data => data.city);
}
// filtrera data för lista och karta
export function makeFilter(data, renderFunction) {
    //const form = document.getElementById("form");
    const provinceInput = document.getElementById("provinces");
    const cityInput = document.getElementById("city");
    //const municipalityInput = document.getElementById("municipality");



    provinceInput.innerHTML = `<option value="Alla">Alla</option>`;


    const provinces = [];
    for (const item of data) {

        if (!provinces.includes(item.province)) {
            provinces.push(item.province);


        const provinceOption = document.createElement("option");
        provinceOption.value = item.province;
        provinceOption.textContent = item.province;
        provinceInput.append(provinceOption);
        }
    }
    updateCity();
// anropa vid filter ändringar
    provinceInput.addEventListener("change", () => {

    updateCity();
    filterData();
    });
    cityInput.addEventListener("change", filterData)

// filtrera vilka städer som ska visas
function updateCity() {
        cityInput.innerHTML = `<option value="Alla">Alla städer</option>`;

        const selectedProvince = provinceInput.value;

    const cities = [];
    for (const item of data) {

        if ((selectedProvince === "Alla" || item.province === selectedProvince) && !cities.includes(item.city)) {

            cities.push(item.city);


        const cityOption = document.createElement("option");
        cityOption.value = item.city;
        cityOption.textContent = item.city;
        cityInput.append(cityOption);
        }
        }
    }
//filtrera data
    function filterData() {
    
    //form.addEventListener("change", () => {
        const selectedCity = cityInput.value;
        const selectedProvince = provinceInput.value;

        let filteredData = data.filter(item => (selectedProvince === "Alla" || item.province === selectedProvince)&& (selectedCity === "Alla" || item.city === selectedCity));
        
        renderFunction(filteredData);
        loadMap(filteredData);
    }
    
}
// rendera egen data utan fil.
export function makeOwnElement(data) {
    const map = document.getElementById("map");
    map.innerHTML = "";
    const api = document.getElementById("api");
    api.remove();
    const filtersElement = document.getElementById("filters");
    filtersElement.innerHTML = "";
}