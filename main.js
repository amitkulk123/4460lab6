var width = 500;
var height = 500;

d3.csv("datasets/TransportationFatalities_ByYear_postoncanvas.csv", function (csv) {
    console.log(csv);
    
    // Functions used for scaling axes +++++++++++++++
    var yearExtent = d3.extent(csv, function (row) {
        // format the year as a number without comma
        return row.Year;
    });

    var carExtent = d3.extent(csv, function (row) {
        return row.Car_Occupant;
    });


    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Axis setup
    var xScale = d3.scaleLinear().domain(yearExtent).range([50, 470]);
    var yScale = d3.scaleLinear().domain(carExtent).range([470, 30]);
    var xAxis = d3.axisBottom().scale(xScale);
    var yAxis = d3.axisLeft().scale(yScale);

    //Create SVGs for charts
    var chart1 = d3
    .select("#chart1")
    .append("svg:svg")
    .attr("id", "svg1")
    .attr("width", width)
    .attr("height", height);

     //Labels for Charts
    // var title1 = d3
    // .select("#svg1")
    // .append("text")
    // .attr("x", width/2)
    // .attr("y", 12)
    // .attr("font-size", "12px")
    // .text("Fat vs Carb"); 

    chart1 // or something else that selects the SVG element in your visualizations
    .append("g") // create a group node
    .attr("transform", "translate(0," + (width - 30) + ")")
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

    // append the data points for car to the chart 
    chart1.selectAll("circle")
    .data(csv)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
        return xScale(d.Year);
    })
});

// Create an update function for the axis that will scale the axis based on the data