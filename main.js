// Global function called when the button is clicked
function onCategoryChanged() {
    // create an array of the modes of transportation that are selected
    var filter = [];
    if (d3.select("#totals").property("checked")) {
        filter.push("Total_Per_100K");
    }
    if (d3.select("#cars").property("checked")) {
        filter.push("Car_Per_100K");
    }
    if (d3.select("#pedestrians").property("checked")) {
        filter.push("Ped_Per_100K");
    }
    if (d3.select("#motorcycles").property("checked")) {
        filter.push("Motorcycle_Per_100K");
    }
    if (d3.select("#bicycles").property("checked")) {
        filter.push("Bicycle_Per_100K");
    }
    if (d3.select("#trucks").property("checked")) {
        filter.push("Trucks_Per_100K");
    }
    updateChart(filter);
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

var data;
var svg = d3.select('svg');
var chart1 = svg.append('g');

d3.csv("datasets/TransportationFatalities_ByYear_postoncanvas.csv", function (csv) {
    data = csv;
    
    var initialFilter = ["Total_Per_100K", "Car_Per_100K", "Ped_Per_100K", "Motorcycle_Per_100K", "Bicycle_Per_100K", "Trucks_Per_100K"];

    chart1 = d3
    .select("#chart1")
    .append("svg:svg")
    .attr("id", "svg1")
    .attr("width", width)
    .attr("height", height);

    // Add filter button
    d3.select('.options')
    .append('p')
    .append('button')
    .attr('id', 'filterButton')
    .style("border", "1px solid black")
    .text('Filter Data')
    .on('click', function() {
        onCategoryChanged();
    });

    addAxes(data);
    updateChart(initialFilter);
});

function addAxes(filter) {
    // Axis setup
    xScale = d3.scaleTime().domain(d3.extent(data, function(d) { 
        return d3.timeParse("%Y")(d.Year);
    })).range([50, width-30]);
    yScale = d3.scaleLinear().domain([0, (
        d3.max(data, function(d) {
            return d3.max(filter, function(key) {
                return +d[key];
            });
        })
    )]).range([height-30, 30]);

    var xAxis = d3.axisBottom().scale(xScale);
    var yAxis = d3.axisLeft().scale(yScale);

    // Create labels for the chart

    var graph = chart1.selectAll('.y-axis').data(data)
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
    .data(data)
    .call(yAxis)
    .append("text")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end");

    graph.exit().remove();
}

function updateChart(filter) {
    var modes = [];
    console.log(filter);

    addAxes(filter);
    

    // append the total data points to the chart as a line graph
    chart1.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
        .x(function(d) { 
            return xScale(d3.timeParse("%Y")(d.Year)) 
        })
        .y(function(d) { 
            return yScale(d.Total_Per_100K) 
        }))

    // append the car data points to the chart as a line graph
    chart1.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
        .x(function(d) {
            return xScale(d3.timeParse("%Y")(d.Year))
        })
        .y(function(d) {
            return yScale(d.Car_Per_100K)
        }))

    // append the pedestrian data points to the chart as a line graph
    chart1.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "green")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
        .x(function(d) {
            return xScale(d3.timeParse("%Y")(d.Year))
        })
        .y(function(d) {
            return yScale(d.Ped_Per_100K)
        }))

    // append the motorcycle data points to the chart as a line graph
    chart1.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "pink")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
        .x(function(d) {
            return xScale(d3.timeParse("%Y")(d.Year))
        })
        .y(function(d) {
            return yScale(d.Motorcycle_Per_100K)
        }))
    
    // append the bicycle data points to the chart as a line graph
    chart1.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
        .x(function(d) {
            return xScale(d3.timeParse("%Y")(d.Year))
        })
        .y(function(d) {
            return yScale(d.Bicycle_Per_100K)
        }))

    // append the truck data points to the chart as a line graph
    chart1.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "brown")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
        .x(function(d) {
            return xScale(d3.timeParse("%Y")(d.Year))
        })
        .y(function(d) {
            return yScale(d.Trucks_Per_100K)
        }))
}