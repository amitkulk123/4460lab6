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

    for(var i = 0; i < filter.length; i++) {
        var line = d3.line()
        .x(function(d) {
            return xScale(d3.timeParse("%Y")(d.Year));
        })
        .y(function(d) {
            return yScale(+d[filter[i]]);
        });

        chart1.append("path")
        .datum(modes)
        .attr("d", line)
        .attr("class", function() {
            if(filter[i] == "Total_Per_100K") {
                return "totals line"
            } else if(filter[i] == "Car_Per_100K") {
                return "cars line"
            } else if(filter[i] == "Ped_Per_100K") {
                return "pedestrians line"
            } else if(filter[i] == "Motorcycle_Per_100K") {
                return "motorcycles line"
            } else if(filter[i] == "Bicycle_Per_100K") {
                return "bicycles line"
            } else if(filter[i] == "Trucks_Per_100K") {
                return "trucks line"
            }
        })
    }


    // add a mouseover event to the chart that will show the data points for each line
    var mouseG = chart1.append("g").attr("class", "mouse-hover");

    mouseG.append("path")
    .attr("class", "mouse-line")
    .style("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", "0");

    var mousePerLine = mouseG.selectAll('.mouse-per-line')
    .data(modes)
    .enter()
    .append("g")
    .attr("class", "mouse-per-line");

    mousePerLine.append("circle")
    .attr("r", 7)
    .style("stroke", "black")
    .style("fill", "none")
    .style("stroke-width", "1px")
    .style("opacity", "0");

    mousePerLine.append("text")
    .attr("transform", "translate(10,3)");

    mouseG.append('svg:rect')
    .attr('width', (width - 30))
    .attr('height', (height))
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .on('mouseout', function() {
        d3.select(".mouse-line")
        .style("opacity", "0");
        d3.selectAll(".mouse-per-line circle")
        .style("opacity", "0");
        d3.selectAll(".mouse-per-line text")
        .style("opacity", "0");
    })
    .on('mouseover', function() {
        d3.select(".mouse-line")
        .style("opacity", "1")
        d3.selectAll(".mouse-per-line circle")
        .style("opacity", "1");
        d3.selectAll(".mouse-per-line text")
        .style("opacity", "1");
    })
    // it seems like the mousemove event is not working properly
    .on('mousemove', function() {
        var lines = document.getElementsByClassName('line');
        var mouse = d3.mouse(this);
        d3.select(".mouse-line")
        .attr("d", function() {
            var d = "M" + mouse[0] + "," + height;
            d += " " + mouse[0] + "," + 0;
            return d;
        });
        
            d3.selectAll(".mouse-per-line")
            .attr("transform", function(d, i) {
            var xDate = xScale.invert(mouse[0]),
            bisect = d3.bisector(function(d) { return d.Year; }).right;
            idx = bisect(d, xDate);

            var beginning = 0;
            var end;
            // end should not be undefined
            try {
                end = lines[i].getTotalLength();
            } catch (TypeError) {
                end = 0;
            }
            // if(lines[i].getTotalLength() != undefined) {
            //     end = lines[i].getTotalLength();
            // } else {
            //     end = 0;
            // }
            var target = null;

            while (true) {
                target = Math.floor((beginning + end) / 2);
                var pos;
                try {
                    pos = lines[i].getPointAtLength(target)
                } catch (TypeError) {
                    pos = 0;
                }
                // if(lines[i].getPointAtLength(target) != undefined) {
                //     pos = lines[i].getPointAtLength(target);
                // } else {
                //     pos = 0;
                // }
                if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                    break;
                }
                if (pos.x > mouse[0])      end = target;
                else if (pos.x < mouse[0]) beginning = target;
                else break;
            }

            d3.select(this).select('text')
            .text(yScale.invert(pos.y).toFixed(2));

            if (pos.y == undefined) {
                return;
            }  else {
                return "translate(" + mouse[0] + "," + pos.y +")";
            }
        });
            
});



}