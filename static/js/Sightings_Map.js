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
    // if (!response[i].coordinates.includes(null)) 
    if (response[i].coordinates[0] !== null && response[i].coordinates[1] !== null){
      console.log(response[i].coordinates);
      L.circle(response[i].coordinates, {
        fillOpacity: 0.75,
        color: "purple",
        fillColor: "purple",
        radius: 50000
      }).bindPopup(`<h3>${response[i].Location}</h3><hr><b>Date Reported :</b> ${response[i].Date}<br><b>Description :</b> ${response[i].Summary}`).addTo(myMap);
    }

    } 
});
