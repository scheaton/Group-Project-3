// leaflet

d3.json(url).then(function(data){
    createFeatures(data.features);
    console.log(data)
});

function createHeatMap(sightingsData)

function createMap(sightings){
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    
    var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    var baseMaps = {
        "Street Map": street, 
        "Topographic Map": topo
    }


    
    var myMap = L.map("map", {
        center: [
            37.09, -95.71
         ], 
         zoom: 4, 
         layers: street, sightings
        })

};


