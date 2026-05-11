  const map = L.map("api").setView([56.8790, 14.8058], 9);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const markers = L.layerGroup().addTo(map);

export async function loadMap(data) {

  markers.clearLayers();
    for (const place of data) {
      L.marker([place.lat,place.lng]).addTo(markers).bindPopup(`<h3>${place.name}</h3>`); }
  }