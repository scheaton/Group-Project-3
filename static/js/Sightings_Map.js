// leaflet
var myMap = L.map("map", {
  center: [
     37.09, -95.71
    ], 
    zoom: 4, 
  });

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

d3.json(url).then(function(response){
  
    // var coordList= [];
    coordList = [];
    for(var i=0;i<response.length;i++){

      var location = response[i].Coordinates

      if (location) {
        coordList.push([location['Latitude'], location['Longitude']]);
        L.circle([location['Latitude'], location['Longitude']]).addTo(myMap);
      };
    };
    console.log(coordList)
     

      // var heat = L.heatLayer([coordList], {
      //   radius: 20, 
      //   blur: 35, 
      // }).addTo(myMap);


        
    });


    // L.Circle(coordList,{
    //     radius: 20,
    //     blur:35
    // }).addTo(myMap);



