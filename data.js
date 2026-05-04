export function makeFetchElement(data) {
    const map = document.getElementById("map");
    map.innerHTML = "";

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