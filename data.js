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
async function convertToCity(lat, lng) {
    const response = fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}localityLanguage=en
`);
    return response.then(res => res.json())
        .then(data => data.city);
}

export function makeFilter(data) {
    const form = document.getElementById("form");
    const provinceInput = document.getElementById("provinces");
   /* const priceInput = document.getElementById("price");
    const priceValue = document.getElementById("priceValue");

    priceValue.textContent = priceInput.value;
    */
    
    form.addEventListener("change", () => {
        const selectedProvince = provinceInput.value;

        let filteredData = data.filter(item => item.province === selectedProvince);

        if (selectedProvince === "Alla") {
            makeFetchElement(data);
            return;
        }
        else {
        makeFetchElement(filteredData);
    }});
}

export function makeOwnElement(data) {
    const map = document.getElementById("map");
    map.innerHTML = "";
    const api = document.getElementById("api");
    api.innerHTML = "";
    const filtersElement = document.getElementById("filters");
    filtersElement.innerHTML = "";
}