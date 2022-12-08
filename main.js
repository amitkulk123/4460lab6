// Global function called when the button is clicked
function onCategoryChanged() {
    // console.log("--------------------");
    // // print out all of the modes of transportation that are selected
    // console.log("Cars selected: " + d3.select("#cars").property("checked"));
    // console.log("Pedestrians selected: " + d3.select("#pedestrians").property("checked"));
    // console.log("Motorcycles selected: " + d3.select("#motorcycles").property("checked"));
    // console.log("Bicycles selected: " + d3.select("#bicycles").property("checked"));
    // console.log("Trucks selected: " + d3.select("#trucks").property("checked"));
    // // print out if yearly or 100k is selected
    // console.log("\nYearly selected: " + d3.select("#yearly").property("checked"));
    // console.log("100k selected: " + d3.select("#hundredk").property("checked"));
    // console.log("You clicked the button!")
    // console.log("--------------------");

    // create an array of the modes of transportation that are selected
    var modes = [];
    if (d3.select("#cars").property("checked")) {
        modes.push("Car_Occupant");
    }
    if (d3.select("#pedestrians").property("checked")) {
        modes.push("Pedestrian");
    }
    if (d3.select("#motorcycles").property("checked")) {
        modes.push("Motorcycle");
    }
    if (d3.select("#bicycles").property("checked")) {
        modes.push("Bicycle");
    }
    if (d3.select("#trucks").property("checked")) {
        modes.push("Trucks");
    }

    console.log(modes);
    updateChart(modes)
}

var width = 600;
var height = 400;

// scales
var xScale;
var yScale;

// chart1 = d3
// .select("#chart1")
// .append("svg:svg")
// .attr("id", "svg1")
// .attr("width", width)
// .attr("height", height);

d3.csv("datasets/TransportationFatalities_ByYear_postoncanvas.csv", function (csv) {
    var chart1 = d3
    .select("#chart1")
    .append("svg:svg")
    .attr("id", "svg1")
    .attr("width", width)
    .attr("height", height);

    addAxes(csv);

    // append the car data points to the chart as a line graph
    chart1.append("path")
    .datum(csv)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
        .x(function(d) { 
            return xScale(d3.timeParse("%Y")(d.Year)) 
        })
        .y(function(d) { 
            return yScale(d.Car_Occupant) 
        }))

    // append the pedestrian data points to the chart as a line graph
    chart1.append("path")
    .datum(csv)
    .attr("fill", "none")
    .attr("stroke", "green")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
        .x(function(d) {
            return xScale(d3.timeParse("%Y")(d.Year))
        })
        .y(function(d) {
            return yScale(d.Pedestrian)
        }))

    // append the motorcycle data points to the chart as a line graph
    chart1.append("path")
    .datum(csv)
    .attr("fill", "none")
    .attr("stroke", "pink")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
        .x(function(d) {
            return xScale(d3.timeParse("%Y")(d.Year))
        })
        .y(function(d) {
            return yScale(d.Motorcycle)
        }))
    
    // append the bicycle data points to the chart as a line graph
    chart1.append("path")
    .datum(csv)
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
        .x(function(d) {
            return xScale(d3.timeParse("%Y")(d.Year))
        })
        .y(function(d) {
            return yScale(d.Bicycle)
        }))

    // append the truck data points to the chart as a line graph
    chart1.append("path")
    .datum(csv)
    .attr("fill", "none")
    .attr("stroke", "brown")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
        .x(function(d) {
            return xScale(d3.timeParse("%Y")(d.Year))
        })
        .y(function(d) {
            return yScale(d.Trucks)
        }))

    // // Add filter button
    d3.select('.options')
        .append('p')
        .append('button')
        .attr('id', 'filterButton')
        .style("border", "1px solid black")
        .text('Filter Data')
        .on('click', function() {
            onCategoryChanged();
        });


});

function addAxes(transit) {
    // Axis setup
    xScale = d3.scaleTime().domain(d3.extent(transit, function(d) { 
        // console.log(d.Year)
        return d3.timeParse("%Y")(d.Year);
    })).range([50, width-30]);
    yScale = d3.scaleLinear().domain([0, (d3.max(transit, function(d) {
        return d.Car_Occupant;
    }))]).range([height-30, 30]);

    var xAxis = d3.axisBottom().scale(xScale);
    var yAxis = d3.axisLeft().scale(yScale);

    // Create labels for the chart

    var chart1 = d3.select('#chart1').select('svg');
    var graph = chart1.selectAll('.y-axis').data(transit)
    var chartGEnter = graph.enter()

    // append x-axis
    chart1 // or something else that selects the SVG element in your visualizations
    .append("g") // create a group node
    .attr("class", "axis-label x-axis")
    .attr("transform", "translate(0," + (height - 30) + ")")
    .call(xAxis) // call the axis generator
    .append("text")
    .attr("x", width - 16)
    .attr("y", -6)
    .style("text-anchor", "end")

    chartGEnter 
    .append("g") // create a group node
    .attr("class", "axis-label y-axis")
    .attr("transform", "translate(50, 0)")
    .merge(chart1.selectAll(".y-axis"))
    .data(transit)
    .call(yAxis)
    .append("text")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end");

    graph.exit().remove();
}

function updateChart(modes) {
    
}