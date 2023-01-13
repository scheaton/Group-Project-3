// // leaflet
// var myMap = L.map("map", {
//   center: [
//     37.09, -95.71
//   ],
//   zoom: 4,
// });

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(myMap);


d3.json(url).then(function(response) {
  // console.log(response);

  markers = [];
  heatArray = [];
  for (var i = 0; i < response.length; i++) {
    // if (!response[i].coordinates.includes(null)) 
    if (response[i].coordinates[0] !== null && response[i].coordinates[1] !== null){
      console.log(response[i].coordinates);
      
      markers.push( L.circle(response[i].coordinates, {
        fillOpacity: 0.75,
        color: "purple",
        fillColor: "purple",
        radius: 50000
      }).bindPopup(`<h3>${response[i].Location}</h3><hr><b>Date Reported :</b> ${response[i].Date}<br><b>Description :</b> ${response[i].Summary}`))
      
      // heatArray.push(L.heatLayer(response[i].coordinates, {
      //   radius: 20,
      //   blur: 35}))
    };
  }

  var sightingMarkers = L.layerGroup(markers)
  // var heatMap = L.layerGroup(heatArray)

  var overlayMaps = {
    // "Sightings Heatmap": heatMap, 
    "Sightins Info": sightingMarkers
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
    layers: [street, sightingMarkers]
  });
  
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap)

});
