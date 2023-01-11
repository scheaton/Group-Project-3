


common_shapes_labels = ['Circle', 'Disk', 'Sphere', 'Light', 'Diamond', 'Cigar', 'Rectangle', 'Triangle', 'Oval', 'Formation', 'Changing', 'Other'];
state_shapes_values = [0,0,0,0,0,0,0,0,0];
us_shapes_values = [0,0,0,0,0,0,0,0,0];

function filterShapes(labels, values, shape) {
    if (labels.includes(shape)) {
        values[labels.indexOf(shape)]++;
    } else {
        values[labels.indexOf('Other')]++;
    };
};



function init() {

    let dropDown = d3.select('#selectedStateAbbrev');

    for (let i = 0; i < usStates.length; i++) {
        dropDown.append("option").text(usStates[i].abbreviation);
    };



    d3.json(sightings_url).then(data => {
        for (let i = 0; i < data.length; i++) {
            shape = data[i].Shape;
            if (data[i].State == 'AL') {
                filterShapes(common_shapes_labels, state_shapes_values, shape);
            } else {
                filterShapes(common_shapes_labels, us_shapes_values, shape);
            }
        };

        // Only take shapes with nonzero sightings
        state_shapes_labels_nonzero = [];
        state_shapes_values_nonzero = [];
        for (let i = 0; i <= common_shapes_labels.length; i++) {
            if ((state_shapes_values[i] != 0) && (state_shapes_values[i] != 'NaN')) {
                state_shapes_labels_nonzero.push(common_shapes_labels[i]);
                state_shapes_values_nonzero.push(state_shapes_values[i]);
            }
        }
        console.log(state_shapes_values);
        console.log(state_shapes_values_nonzero);

        // Pie Charts
        let stateData = [{
            values: state_shapes_values_nonzero, // values
            labels: state_shapes_labels_nonzero, // shape names
            type: 'pie',
            automargin: true
        }];

        let usData = [{
            values: us_shapes_values, // values
            labels: common_shapes_labels, // shape names
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


    });

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
    d3.json(sightings_url).then(data => {
    state_shapes_values = [0,0,0,0,0,0,0,0,0];
        for (let i = 0; i < data.length; i++) {
            shape = data[i].Shape;
            if (data[i].State == newStateAbbrev) {
                filterShapes(common_shapes_labels, state_shapes_values, shape);
            };
        };

        // Clean up shapes with 0 sightings
        state_shapes_labels_nonzero = [];
        state_shapes_values_nonzero = [];
        for (let i = 0; i < common_shapes_labels.length; i++) {
            if (state_shapes_values[i] != 0) {
                state_shapes_labels_nonzero.push(common_shapes_labels[i]);
                state_shapes_values_nonzero.push(state_shapes_values[i]);
            }
        }

        let stateData = {
            values: [state_shapes_values_nonzero],
            labels: [state_shapes_labels_nonzero],
        }

        Plotly.restyle('statePieChart', stateData, [0]);
    });


};

init();