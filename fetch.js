const response = await fetch("dates.json");
const categories = await response.json();

makeClick(categories[0]);

export async function getFetch(category = {}) {
    
    const params = new URLSearchParams();



    params.append("api_key", window.apiKey);

    if (category.controller) {
        params.append("controller", category.controller);
    }
    if (category.method) {
        params.append("method", category.method);
    }


    if (category.filter) {
        for (const value in category.filter) {
            params.append(value, category.filter[value]);
        }
    } 
    if (category.type === "local") {
        const response = await fetch(category.filename);
        const data = await response.json();
        console.log(data);
    }

    const response = await fetch(`https://smapi.lnu.se/api/?${params.toString()}`);
    const data = await response.json();
    return data;
 }



export async function makeClick(category) {
    const data = await getFetch(category);
    //console.log(data);
 }