export async function getFetch(controller, method, extrainput = {}) {
    
    const params = new URLSearchParams({
        controller: controller,
        method: method,
        api_key: window.apiKey,
    });

    for (const value in extrainput) {
        params.append(value, extrainput[value]);
    }

    const response = await fetch(`https://smapi.lnu.se/api/?${params.toString()}`);
    const data = await response.json();
    console.log(response);
    return data;
 }
 getFetch("establishment", "getall");