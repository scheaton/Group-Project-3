// // leaflet
d3.json(url).then(function (response) {
  // console.log(response);

  markers = [];
  heatArray = [];
  for (var i = 0; i < response.length; i++) {
    // console.log(response[i].coordinates);
    if (!response[i].coordinates.includes(null)) {
      // if (response[i].coordinates[0] !== null && response[i].coordinates[1] !== null){


      markers.push(L.circle(response[i].coordinates, {
        fillOpacity: 0.75,
        color: "black",
        fillColor: "yellow",
        radius: 50000, 
        weight: 1
      }).bindPopup(`<h3>${response[i].Location}</h3><hr><b>Date Reported :</b> ${response[i].Date}<br><b>Description :</b> ${response[i].Summary}`))

      heatArray.push([response[i].coordinates[0], response[i].coordinates[1]]);  
    };
  }
  var heat = L.heatLayer(heatArray, {
    radius: 20,
    blur: 2,
    gradient: {0.1: 'blue', 0.3: 'lime', 0.5: 'red'}
  })
  console.log(heatArray)

  var sightingMarkers = L.layerGroup(markers)
  var overlayMaps = {
    "Sightings Heatmap": heat,
    "Sightings Info": sightingMarkers
  };

  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 4,
    layers: [street,heat,sightingMarkers]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap)

});
