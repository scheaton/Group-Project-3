// Choose how shapes will be organized
common_shapes_labels = ['Circle', 'Disk', 'Sphere', 'Oval', 'Cigar', 'Rectangle', 'Diamond', 'Triangle', 'Light', 'Formation', 'Changing', 'Other'];
all_labels_colors =['#DC143C',  // crimson              circle
                    '#FA8072',  // salmon               disk
                    '#B22222',  // firebrick            sphere
                    '#FFA500',  // orange               oval
                    '#9ACD32',  // yellowgreen          cigar
                    '#8FBC8F',  // darkseagreen         rectangle
                    '#9467bd',  // mutedpurple          diamond
                    '#17becf',  // blue-teal            triangle
                    '#ffeb3b',  // yellow               light
                    '#2ca02c',  // cookedasparagusgreen formation
                    '#e377c2',  // raspberryyogurtpink  changing
                    '#7f7f7f'   // middle gray          other
]
old_all_labels_colors =['#1f77b4',  // muted blue
                    '#ff7f0e',  // safety orange
                    '#2ca02c',  // cooked asparagus green
                    '#d62728',  // brick red
                    '#9467bd',  // muted purple
                    '#8c564b',  // chestnut brown
                    '#e377c2',  // raspberry yogurt pink
                    '#7f7f7f',  // middle gray
                    '#bcbd22',  //curry yellow-green
                    '#17becf',  // blue-teal
                    '#ffeb3b',  // yellow
                    '#8bc34a'   // light green
]

// Make empty arrays the same length as common_shapes_labels
state_shapes_values = [];
us_shapes_values = [];
for (let i = 0; i < common_shapes_labels.length; i++) {
    state_shapes_values.push(0);
    us_shapes_values.push(0);
};

// Function to sort sighting shapes according to common_shapes_labels
function filterShapes(labels, values, shape) {
    if (labels.includes(shape)) {
        values[labels.indexOf(shape)]++;
    } else {
        values[labels.indexOf('Other')]++;
    };
};

function init() {
    // Dropdown to choose any US State
    let dropDown = d3.select('#selectedStateAbbrev');
    for (let i = 0; i < usStates.length; i++) {
        dropDown.append("option").text(usStates[i].abbreviation);
    };

    // Retrieve data and initialize pie charts for United States and Alabama (alphabetically first state)
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
        state_labels_colors = [];  // neccessary to have label colors match from US chart to State chart 
        state_shapes_labels_nonzero = [];
        state_shapes_values_nonzero = [];
        for (let i = 0; i <= common_shapes_labels.length; i++) {
            if (state_shapes_values[i] != 0) {
                state_shapes_labels_nonzero.push(common_shapes_labels[i]);
                state_shapes_values_nonzero.push(state_shapes_values[i]);
                state_labels_colors.push(all_labels_colors[i]);
            }
        }

        // Pie Charts
        let stateData = [{
            values: state_shapes_values_nonzero, // values
            labels: state_shapes_labels_nonzero, // shape names
            type: 'pie',
            automargin: true,
            marker: {
                colors: state_labels_colors
              },
            sort: false, // Make labels match from US chart to State chart 
            textinfo: "label+value",
            textposition: "inside"
        }];

        let usData = [{
            values: us_shapes_values, // values
            labels: common_shapes_labels, // shape names
            type: 'pie',
            automargin: true,
            marker: {
                colors: all_labels_colors
              },
            sort: false, // Make labels match from US chart to State chart
            textinfo: "label+value",
            textposition: "inside"
        }];

        let pieLayout = {
        autosize: true,
        margin: {"t": 0, "b": 0, "l": 0, "r": 0},
        paper_bgcolor: 'transparent',
        showlegend: false
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
        // Only take shapes with nonzero sightings
        state_labels_colors = [];  // neccessary to have label colors match from US chart to State chart 
        state_shapes_labels_nonzero = [];
        state_shapes_values_nonzero = [];
        for (let i = 0; i <= common_shapes_labels.length; i++) {
            if (state_shapes_values[i] != 0) {
                state_shapes_labels_nonzero.push(common_shapes_labels[i]);
                state_shapes_values_nonzero.push(state_shapes_values[i]);
                state_labels_colors.push(all_labels_colors[i]);
            }
        }

        let stateData = {
            values: [state_shapes_values_nonzero],
            labels: [state_shapes_labels_nonzero],
            marker: {
                colors: state_labels_colors
            }
        }

        Plotly.restyle('statePieChart', stateData, [0]);
    });

};

init();