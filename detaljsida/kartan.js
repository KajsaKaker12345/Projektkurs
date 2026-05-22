  import { getImageRating } from "../data.js";
  const map = L.map("api").setView([56.8790, 14.8058], 7);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const markers = L.layerGroup().addTo(map);

export async function loadMap(data) {

  markers.clearLayers();
  const bounds = [];
  
    for (const place of data) {
      const ratingImage = getImageRating(place.rating);

      L.marker([place.lat,place.lng]).addTo(markers).bindPopup(`<h3>${place.name}</h3><div class="rating"><p>${Number(place.rating)}/5</p><img src ="${ratingImage}"></div></div>`); 
      bounds.push([place.lat, place.lng]);
    }

    if (bounds.length > 0) {
      map.fitBounds(bounds, {
        padding: [20, 20],
        maxZoom: 9
      });
    }
  }