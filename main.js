var width = 500;
var height = 500;

d3.csv("datasets/TransportationFatalities_ByYear_postoncanvas.csv", function (csv) {
    for (var i = 0; i < csv.length; ++i) {
        csv[i].Car_Occupant = Number(csv[i].Car_Occupant)
        csv[i].Pedestrian = Number(csv[i].Pedestrian);
        csv[i].Motorcycle = Number(csv[i].Motorcycle);
        csv[i].Trucks = Number(csv[i].Trucks);
        csv[i].Bicycle = Number(csv[i].Bicycle);
        csv[i].Total = Number(csv[i].Total);
    }

    // Functions used for scaling axes +++++++++++++++
    var yearExtent = d3.extent(csv, function (row) {
        // format the year as a number without comma
        return row.Year;
    });

    var carExtent = d3.extent(csv, function (row) {
        return row.Car_Occupant;
    });

    var pedestrianExtent = d3.extent(csv, function (row) {
        return row.Pedestrian;
    });

    var motorcycleExtent = d3.extent(csv, function (row) {
        return row.Motorcycle;
    });

    var trucksExtent = d3.extent(csv, function (row) {
        return row.Trucks;
    });

    var bicycleExtent = d3.extent(csv, function (row) {
        return row.Bicycle;
    });

    var totalExtent = d3.extent(csv, function (row) {
        return row.Total;
    });


    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Axis setup
    var xScale = d3.scaleLinear().domain(yearExtent).range([50, 470]);
    var yScale = d3.scaleLinear().domain(carExtent).range([470, 30]);
    var xAxis = d3.axisBottom().scale(xScale);
    var yAxis = d3.axisLeft().scale(yScale);

    var line = d3.line()
			.x(function(d){ return x(d.Car_Occupant); })
			.y(function(d){ return y(d.Year); })
			.curve(d3.curveCardinal);

    //Create SVGs for charts
    var chart1 = d3
    .select("#chart1")
    .append("svg:svg")
    .attr("id", "svg1")
    .attr("width", width)
    .attr("height", height);

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

    chart1.append("path")
    .attr("class","line")
    .attr("d",function(d){ return line(); })

});

// Create an update function for the axis that will scale the axis based on the data