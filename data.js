import { loadMap } from "./detaljsida/kartan.js";

export function getImageRating(rating) {
    const roundedRating = Math.round(Number(rating) * 2) / 2;
    

    if (roundedRating === 1) {
        return "../image/1stars.svg"
    } else if (roundedRating === 1.5) {
        return "../image/15stars.svg"
    } else if (roundedRating === 2) {
        return "../image/2stars.svg"
    } else if (roundedRating === 2.5) {
        return "../image/25stars.svg"
    } else if (roundedRating === 3) {
        return "../image/3stars.svg"
    } else if (roundedRating === 3.5) {
        return "../image/35stars.svg" 
    } else if (roundedRating === 4) {
        return "../image/4stars.svg"
    } else if (roundedRating === 4.5) {
        return "../image/45stars.svg"
    } else {
        return "../image/5stars.svg"
    }
}

// rendera lokal data
export function makeLocalElement(data) {
    const map = document.getElementById("map");
    map.innerHTML = "";
    const filterContainer = document.getElementById("filters");

    for (const item of data) {
        const element = document.createElement("div");
        element.classList.add("map-item");
        const price = item.price ? `Från: ${item.price}kr` : "Ingen kostnad";
        const ratingImage = getImageRating(item.rating);

        element.innerHTML = `
            <h3 class="h3">${item.name}</h3>
            <p class="cityProvince">${item.city}, ${item.province}</p>
            <div class="rating"><p> ${item.rating}/5</p>
            <img src="${ratingImage}" alt="stjärnaa"></div>
            <p class="p">${price}</p>
        `;
            if (item.website) {
        const button = document.createElement("button");
        button.classList.add("webben");
        button.innerHTML = `<a href="${item.website}">Länk till webbsidan</a>`;
        element.append(button);

        }
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
        /*const priceOrRating = item.price_range ? `Prisklass: ${item.price_range}kr` : item.avg_dinner_pricing ? `Genomsnittligt pris: ${item.avg_dinner_pricing}kr` : `Recentioner: ${Number(item.rating)}/5`;*/

        const fromPrice = item.price_range.split("-")[0];
        const price = item.price_range ? `Från: ${fromPrice} kr` : "Ingen kostnad";
        const ratingImage = getImageRating(item.rating);
        

        
        let city = item.city;
        let province = item.province;

        if (!city && item.lat && item.lng) {
            city = await convertToCity(item.lat, item.lng);
        }
        element.innerHTML = `
            <h3 class="h3">${item.name}</h3>
            <p class="cityProvince">${city}, ${province}</p>
            <div class="rating"><p> ${Number(item.rating)}/5</p> 
            <img src ="${ratingImage}"></div>
            <p class="p">${price}</p>
        `;
        if (item.website !== "") {
        const button = document.createElement("button");
        button.classList.add("webben");
        button.innerHTML = `<a href="${item.website}">Länk till webbsidan</a>`;
        element.append(button);
        }
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