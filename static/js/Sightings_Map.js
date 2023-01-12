// // leaflet
var myMap = L.map("map", {
  center: [
    37.09, -95.71
  ],
  zoom: 4,
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


d3.json(url).then(function(response) {
  // console.log(response);
  for (var i = 0; i < response.length; i++) {
    L.circle(response[i].coordinates, {
      fillOpacity: 0.75,
      color: "purple",
      fillColor: "purple",
      radius: 50000
    }).bindPopup(`<h2>${response[i].Location}</h2><hr>${response[i].Summary}<hr>`).addTo(myMap);
  }
  
});
