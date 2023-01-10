// last 6 month trends

let names = []
let abbreviations = []

// For loop to populate arrays
function init() {

    let dropDown = d3.select('#selectedStateAbbrev');
    
    for (let i = 0; i < usStates.length; i++) {
        dropDown.append("option".text(usStates[i].abbreviation))
        row = usStates[i];
        names.push(row.name);
        abbreviations.push(row.abbreviation);
    };

    // Trace1 for the State Data
    let trace1 = {
        x: names,
        y: sightings,
        text: names,
        name: "States",
        type: "bar"
    };

    // Create data array
    let data = [trace1];

    // Apply title
    let layout = {
        title: "Sightings by Month",
        barmode: "group",

        // Include margins 
        margin: {
            l: 50,
            r: 50,
            b: 200,
            t: 50,
            pad: 4
        }
    };

    // Render the plot 
    Plotly.newPlot("plot", data, layout);

};