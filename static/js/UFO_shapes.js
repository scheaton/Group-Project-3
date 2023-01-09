
function init() {

    let dropDown = d3.select('#selectedStateAbbrev');

    for (let i = 0; i < usStates.length; i++) {
        dropDown.append("option").text(usStates[i].abbreviation);
    };

    // Pie Charts
    let stateData = [{
        values: [1,2,3], // values
        labels: ['a','b','c'], // shape names
        type: 'pie',
        automargin: true
    }];

    let usData = [{
        values: [7,8,9], // values
        labels: ['g','h','i'], // shape names
        type: 'pie',
        automargin: true
    }];

    let pieLayout = {
    autosize: true,
    margin: {"t": 0, "b": 0, "l": 0, "r": 0},
    paper_bgcolor: 'transparent',
    // plot_bgcolor: 'transparent',
    legend: {x: 0}
    };

    let config = {responsive: true}
      
    Plotly.newPlot('statePieChart', stateData, pieLayout, config); 
    Plotly.newPlot('usPieChart', usData, pieLayout, config);

};

// Update state pie chart when a new state is selected.
d3.selectAll("#selectedStateAbbrev").on("change", optionChanged);

function optionChanged() {
    // Assign the value of the dropdown menu option to a letiable
    let newStateAbbrev = d3.select("#selectedStateAbbrev").property("value");
    // Update the name of the State
    let newStateName = usStates.find(item => (item.abbreviation == newStateAbbrev)).name;
    let stateName = d3.select('#selectedStateName');
    stateName.text(newStateName + "  ");
    // Update to new selected state data
    let stateData = {
        values: [[4,5,6]], // values
        labels: [['d','e','f']], // shape names
    }

    Plotly.restyle('statePieChart', stateData, [0]);
      

};

init();