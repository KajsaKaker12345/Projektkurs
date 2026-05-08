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
    filterContainer.innerHTML = `<h2>Föreslagna platser</h2>
        <form>
            <label for="place">Plats</label>
            <select name="" id="">
                <option"></option>
            </select>
        </form>`;
}

export function makeFetchElement(data) {
    const map = document.getElementById("map");
    map.innerHTML = "";
    const filterContainer = document.getElementById("filters");

    for (const item of data) {
        const element = document.createElement("div");
        element.classList.add("map-item");
        const priceOrRating = item.price_range ? `Prisklass: ${item.price_range}kr` : item.avg_dinner_pricing ? `Genomsnittligt pris: ${item.avg_dinner_pricing}kr` : `Recentioner: ${Number(item.rating)}/5`;

        element.innerHTML = `
            <h3>${item.name}</h3>
            <p>${priceOrRating}</p>
            <p>${item.city}, ${item.province}</p>
        `;
        map.append(element);
    }
    

    const filters =[];

    if (data.some(item => item.price_range)) {
        filters.push("price_range");
    }

    if (data.some(item => item.avg_dinner_pricing)) {
        filters.push("avg_dinner_pricing");
    }

    if (data.some(item => item.rating)) {
        filters.push("rating");
    }

    // filter container
    filterContainer.innerHTML = `<h2>Föreslagna platser</h2>
        <form>
            <label for="price">Prisklass</label>
            <select name="price" id="price">
            ${filters.includes("price_range")}
                <option"></option>
            </select>
        </form>`;
}