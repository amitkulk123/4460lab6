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

    updateChart(initialFilter);
});

function addAxes(modes) {
    // Axis setup
    xScale = d3.scaleTime().domain(d3.extent(data, function(d) { 
        return d3.timeParse("%Y")(d.Year);
    })).range([50, width-30]);
    yScale = d3.scaleLinear().domain([
        (d3.min(modes, function(d) {
                return d3.min(Object.keys(d), function(key) {
                    // return d[key];
                    return +d[key];
                })
        })),
        (d3.max(modes, function(d) {
            return d3.max(Object.keys(d), function(key) {
                // return d[key];
                return +d[key];
            })
        }))
    ]).range([height-30, 30]);

    var xAxis = d3.axisBottom().scale(xScale);
    var yAxis = d3.axisLeft().scale(yScale);

    // Create labels for the chart

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

    var chart1Enter = chart1.selectAll('.y-axis').data(data)

    chart1Enter.enter()
    .append("g") // create a group node
    .attr("class", "axis-label y-axis")
    .attr("transform", "translate(50, 0)")
    .merge(chart1.selectAll(".y-axis"))
    .data(data)
    .call(yAxis)
    .append("text")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")

    chart1Enter.exit().remove();
}

function updateChart(filter) {
    var modes = data.map(item =>
        filter.reduce((acc, key) => {
            acc[key] = item[key];
            return acc;
        }, {})
    )
    
    addAxes(modes);

    // add the year to modes after the axes are updated 
    modes = modes.map(function(d, i) {
        d.Year = data[i].Year;
        return d;
    })
    console.log(modes);
    
    // append the total data points to the chart as a line graph only if the checkbox is checked, otherwise remove it  
    
    chart1.selectAll('.line').remove();

    if(filter.includes('Total_Per_100K')) {
        chart1.selectAll('.totals').remove()
        chart1.append("path")
        .datum(modes)
        .attr("class", "totals line")
        .attr("d", d3.line()
            .x(function(d) {
                return xScale(d3.timeParse("%Y")(d.Year))
            })
            .y(function(d) {
                return yScale(d.Total_Per_100K)
            }))
    } 
    
    if(filter.includes('Car_Per_100K')) {
        chart1.selectAll('.cars').remove()
        chart1.append("path")
        .datum(modes)
        .attr("class", "cars line")
        .attr("d", d3.line()
            .x(function(d) {
                return xScale(d3.timeParse("%Y")(d.Year))
            })
            .y(function(d) {
                return yScale(d.Car_Per_100K)
            }))
    } 

    if(filter.includes('Ped_Per_100K')) {
        chart1.selectAll('.pedestrians').remove()
        chart1.append("path")
        .datum(modes)
        .attr("class", "pedestrians line")
        .attr("d", d3.line()
            .x(function(d) {
                return xScale(d3.timeParse("%Y")(d.Year))
            })
            .y(function(d) {
                return yScale(d.Ped_Per_100K)
            }))
    }

    if(filter.includes('Motorcycle_Per_100K')) {
        chart1.selectAll('.motorcycles').remove()
        chart1.append("path")
        .datum(modes)
        .attr("class", "motorcycles line")
        .attr("d", d3.line()
            .x(function(d) {
                return xScale(d3.timeParse("%Y")(d.Year))
            })
            .y(function(d) {
                return yScale(d.Motorcycle_Per_100K)
            }))
    } 

    if(filter.includes('Bicycle_Per_100K')) {
        chart1.selectAll('.bicycles').remove()
        chart1.append("path")
        .datum(modes)
        .attr("class", "bicycles line")
        .attr("d", d3.line()
            .x(function(d) {
                return xScale(d3.timeParse("%Y")(d.Year))
            })
            .y(function(d) {
                return yScale(d.Bicycle_Per_100K)
            }))
    } 

    if(filter.includes('Trucks_Per_100K')) {
        chart1.selectAll('.trucks').remove()
        chart1.append("path")
        .datum(modes)
        .attr("class", "trucks line")
        .attr("d", d3.line()
            .x(function(d) {
                return xScale(d3.timeParse("%Y")(d.Year))
            })
            .y(function(d) {
                return yScale(d.Trucks_Per_100K)
            }))
    } 
}