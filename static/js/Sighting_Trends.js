// / Fetch the JSON data and console log it
d3.json(state_url).then(function (data) {
    console.log(data)

    let xValues = [];
    let yValues = [];
    // let labels = [];

    for (i = 0; i < data.length; i++) {
        xValues.push(data[i]['state'])
        yValues.push(data[i]['sightings'])
    }

    console.log(xValues)
    // trace for bar chart
    let trace = {
        x: xValues,
        y: yValues,
        type: 'bar',
        // orientation: 'h'
    }
    //data
    let data1 = [trace];

    //layout
    let layout = {
        title: 'Sightings By State',
        xaxis: { title: 'State' },
        yaxis: { title: 'Sightings Number' }
    }

    // Render the plot to the div tag with id "bar"
    Plotly.newPlot("bar", data1, layout);

})
// / Fetch the JSON data and console log it
d3.json(month_url).then(function (data) {
    console.log(data)

    let xValues = [];
    let yValues = [];
    // let labels = [];

    for (i = 0; i < data.length; i++) {
        xValues.push(data[i]['Date/Time'])
        yValues.push(data[i]['sightings'])
    }

    console.log(xValues)
    // trace for bar chart
    let trace = {
        x: xValues,
        y: yValues,
        type: 'bar',
        // orientation: 'h'
    }
    //data
    let data1 = [trace];

    //layout
    let layout = {
        title: 'Sightings By Month',
        xaxis: { title: 'Month' },
        yaxis: { title: 'Sightings Number' }
    }

    // Render the plot to the div tag with id "bar"
    Plotly.newPlot("bar1", data1, layout);

})












































































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
    let trace = {
        x: names,
        y: sightings,
        text: names,
        // name: "States",
        type: "bar"
    };

    // Create data array
    let data = [trace];

    // Apply title
    let layout = {
        title: "Sightings by Month",

        // // Include margins 
        // margin: {
        //     l: 50,
        //     r: 50,
        //     b: 200,
        //     t: 50,
        //     pad: 4
        // }
    };

    // Render the plot 
    Plotly.newPlot("plot", data, layout);

};