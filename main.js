// Global function called when the button is clicked
function onCategoryChanged() {

}

var margin = {
    top: 20,
    right: 80,
    bottom: 30,
    left: 50
}

var width = 600;
var height = 400;

d3.csv("trafficDataSet.csv", function (csv) {
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
    var xScale = d3.scaleTime().domain(d3.extent(csv, function(d) {
        // console.log(d.Year)
        return d3.timeParse("%Y")(d.Year);
    })).range([50, width-30]);
    var yScale = d3.scaleLinear().domain([0, (d3.max(csv, function(d) {
        return d.Car_Occupant;
    }))]).range([height-30, 30]);
    
    var xAxis = d3.axisBottom().scale(xScale);
    var yAxis = d3.axisLeft().scale(yScale);

    var line = d3.line()
        .x(function(d) { return xScale(d.Car_Occupant); })
        .y(function(d) { return yScale(d.Year); });

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
    d3.select('#chart2')
        .append('p')
        .append('button')
        .attr('id', 'filterButton')
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
    
    
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var mouseG = chart1.append("g")
        .attr("class", "mouse-over-effects");
  
    mouseG.append("path") // this is the black vertical line to follow mouse
        .attr("class", "mouse-line")
        .style("stroke", "black")
        .style("stroke-width", "1px")
        .style("opacity", "0");
        
    var lines = document.getElementsByClassName('line');

    var mousePerLine = mouseG.selectAll('.mouse-per-line')
      .data(csv)
      .enter()
      .append("g")
      .attr("class", "mouse-per-line");

    mousePerLine.append("circle")
      .attr("r", 7)
      .style("stroke", "red")
      .style("fill", "none")
      .style("stroke-width", "1px")
      .style("opacity", "0");
    
    mousePerLine.append("text")
      .attr("transform", "translate(10,3)");
    
      mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
      .attr('width', width) // can't catch mouse events on a g element
      .attr('height', height)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mouseout', function() { // on mouse out hide line, circles and text
        d3.select(".mouse-line")
          .style("opacity", "0");
        d3.selectAll(".mouse-per-line circle")
          .style("opacity", "0");
        d3.selectAll(".mouse-per-line text")
          .style("opacity", "0");
      })
      .on('mouseover', function() { // on mouse in show line, circles and text
        d3.select(".mouse-line")
          .style("opacity", "1");
        d3.selectAll(".mouse-per-line circle")
          .style("opacity", "1");
        d3.selectAll(".mouse-per-line text")
          .style("opacity", "1");
      })
      .on('mousemove', function() { // mouse moving over canvas
        var mouse = d3.mouse(this);
        d3.select(".mouse-line")
          .attr("d", function() {
            var d = "M" + mouse[0] + "," + height;
            d += " " + mouse[0] + "," + 0;
            return d;
          });

        d3.selectAll(".mouse-per-line")
          .attr("transform", function(d, i) {
            console.log(width/mouse[0])
            var xDate = xScale.invert(mouse[0]),
                bisect = d3.bisector(function(d) { return d.Year; }).right;
                idx = bisect(d.Car_Occupant, xDate);
            
            var beginning = 0,
                end = lines[i].getTotalLength(),
                target = null;

            while (true){
              target = Math.floor((beginning + end) / 2);
              pos = lines[i].getPointAtLength(target);
              if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                  break;
              }
              if (pos.x > mouse[0])      end = target;
              else if (pos.x < mouse[0]) beginning = target;
              else break; //position found
            }
            
            d3.select(this).select('text')
              .text(y.invert(pos.y).toFixed(2));
              
            return "translate(" + mouse[0] + "," + pos.y +")";
          });
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