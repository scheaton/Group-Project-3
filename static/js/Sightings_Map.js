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
    coordList=[];
    var cityMarkers = [];
    for(var i=0;i<response.length;i++){
        // var location = response[i].Coordinates;

        // if (location){
        //     coordList.push(location['Latitude'],location['Longitude'])
        // }
        cityMarkers.push(
            L.circle(response[i].Coordinates, {
              stroke: false,
              fillOpacity: 0.75,
              color: "purple",
              fillColor: "purple",
              radius: 20
            })
          );
        }
    });
    // L.Circle(coordList,{
    //     radius: 20,
    //     blur:35
    // }).addTo(myMap);



