var width = 600;
var height = 400;

d3.csv("datasets/TransportationFatalities_ByYear_postoncanvas.csv", function (csv) {
    // if the #yearly radio button is selected, filter the data to only include yearly data
    // otherwise, filter the data to include the 100k data
    // if (d3.select("#yearly").property("checked")) {
    //     csv = csv.filter(function (row) {
    //         return row["Year"] !== "100k";
    //     });
    // } else {
    //     csv = csv.filter(function (row) {
    //         return row["Year"] === "100k";
    //     });
    // }


    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Axis setup
    var xScale = d3.scaleTime().domain(d3.extent(csv, function(d) {
        // console.log(d.Year)
        return d3.timeParse("%Y")(d.Year);
    })).range([50, width-30]);
    var yScale = d3.scaleLinear().domain(d3.extent(csv, function(d) {
        return d.Car_Occupant;
    })).range([height-30, 30]);
    
    var xAxis = d3.axisBottom().scale(xScale);
    var yAxis = d3.axisLeft().scale(yScale);

    //Create SVGs for charts
    var chart1 = d3
    .select("#chart1")
    .append("svg:svg")
    .attr("id", "svg1")
    .attr("width", width)
    .attr("height", height);

    // Create labels for the chart

    chart1 // or something else that selects the SVG element in your visualizations
    .append("g") // create a group node
    .attr("transform", "translate(0," + (height - 30) + ")")
    .call(xAxis) // call the axis generator
    .append("text")
    .attr("class", "label")
    .attr("x", width - 16)
    .attr("y", -6)
    .style("text-anchor", "end")

    chart1 // or something else that selects the SVG element in your visualizations
    .append("g") // create a group node
    .attr("transform", "translate(50, 0)")
    .call(yAxis)
    .append("text")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end");


    // append the car data points to the chart as a line graph
    chart1.append("path")
    .datum(csv)
    .attr("fill", "none")
    .attr("stroke", "brown")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
        .x(function(d) { 
            console.log(xScale(d.Year))
            return xScale(d3.timeParse("%Y")(d.Year)) 
        })
        .y(function(d) { 
            console.log(yScale(d.Car_Occupant))
            return yScale(d.Car_Occupant) 
        }))


    // // Add filter button
    d3.select('#chart2')
        .append('p')
        .append('button')
        .style("border", "1px solid black")
        .text('Filter Data')
        .on('click', function() {
            console.log("--------------------");
            // print out all of the modes of transportation that are selected
            console.log("Cars selected: " + d3.select("#cars").property("checked"));
            console.log("Pedestrians selected: " + d3.select("#pedestrians").property("checked"));
            console.log("Motorcycles selected: " + d3.select("#motorcycles").property("checked"));
            console.log("Bicycles selected: " + d3.select("#bicycles").property("checked"));
            console.log("Trucks selected: " + d3.select("#trucks").property("checked"));
            // print out if yearly or 100k is selected
            console.log("\nYearly selected: " + d3.select("#yearly").property("checked"));
            console.log("100k selected: " + d3.select("#hundredk").property("checked"));
            console.log("You clicked the button!")
            console.log("--------------------");
        });


});

function onFilterChanged() {
    var carSelect = d3.select("#cars");
    // Check to see if carSelect is checked
    if (carSelect.property("checked", true)) {
        // If it is, filter the data to only include cars
        console.log("Cars selected");
    }


    var pedestrianSelect = d3.select("#manufacturer").property("checked");
    var motorCycleSelect = d3.select("#cutoff").property("checked");
    var bicycleSelect = d3.select("#bicycle").property("checked");
    var truckSelect = d3.select("#truck").property("checked");

}

// Create an update function for the axis that will scale the axis based on the data
function addAxes(transportation) {

}