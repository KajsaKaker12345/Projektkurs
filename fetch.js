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
    const response = await fetch(`https://smapi.lnu.se/api/?${params.toString()}`);
    
    const data = await response.json();
    return data;
 }



export async function makeClick(category) {
    const data = await getFetch(category);
    return data;
 }