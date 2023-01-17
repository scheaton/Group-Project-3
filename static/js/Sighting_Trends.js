let config = { responsive: true }

// Bar Chart by state

// / Fetch the JSON data and console log it
d3.json(state_url).then(function (data) {
    // console.log(data)

    let xValues = [];
    let yValues = [];

    for (i = 0; i < data.length; i++) {
        xValues.push(data[i]['state'])
        yValues.push(data[i]['sightings'])
    }

    // trace for bar chart
    let trace = {
        x: xValues,
        y: yValues,
        type: 'bar',
    }
    //data
    let data1 = [trace];

    //layout
    let layout = {
        title: 'Sightings By State (Jul - Dec 2022)',
        xaxis: {
            title: 'State',
            autotick: false,
            ticks: 'outside',
            tickangle: 90,
        },
        yaxis: { title: 'Sightings Number' },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent'
    }

    // Render the plot to the div tag with id "bar"
    Plotly.newPlot("bar", data1, layout, config);

})

// Bar Chart by Month
// / Fetch the JSON data and console log it
d3.json(month_url).then(function (data) {
    // console.log(data)

    let xValues = [];
    let yValues = [];

    for (i = 0; i < data.length; i++) {
        xValues.push(data[i]['Date/Time'])
        yValues.push(data[i]['sightings'])
    }

    // trace for bar chart
    let trace = {
        x: xValues,
        y: yValues,
        type: 'bar',
    }
    //data
    let data1 = [trace];

    //layout
    let layout = {
        title: 'Sightings By Month (Jul - Dec 2022)',
        xaxis: { title: 'Month' },
        yaxis: { title: 'Sightings Number' },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent'
    }

    // Render the plot to the div tag with id "bar1"
    Plotly.newPlot("bar1", data1, layout, config);

})

// Bar Chart by Hour of the day
// / Fetch the JSON data and console log it
d3.json(hour_url).then(function (data) {
    console.log(data)

    let xValues = [];
    let yValues = [];

    for (i = 0; i < data.length; i++) {
        xValues.push(data[i]['hour'])
        yValues.push(data[i]['sightings'])
    }

    console.log(xValues)
    // trace for bar chart
    let trace = {
        x: xValues.map(val => `${val}:00`),
        y: yValues,
        type: 'bar',
    }
    //data
    let data1 = [trace];

    //layout
    let layout = {
        title: 'Sightings By Hour of Day (UTC) (Jul - Dec 2022)',
        xaxis: {
            autotick: false,
            ticks: 'outside',
            tickangle: 90,
            title: 'Hour (UTC)'
        },
        yaxis: { title: 'Sightings Number' },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent'
    }

    // Render the plot to the div tag with id "bar2"
    Plotly.newPlot("bar2", data1, layout, config);

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