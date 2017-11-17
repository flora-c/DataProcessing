/**
** date: Flora Boudewijnse
** Student number: 10196153
**
** Source: https://bost.ocks.org/mike/bar/
**
**/

// set chart margins
var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set chart size
var width = 960, height = 500;

// set range
var x = d3.scale.linear().range([0, width], .1);
var y = d3.scale.linear().range([height, 0]);

// set axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
    // .ticks(10, "%");

// svg container
var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// load data from jsonfile
d3.json("file.json", function(error, data) {

  // scale range data
  x.domain(data.map(function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.rain; })]);

  var barWidth = width / data.length;

  var bar = chart.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d, i)
        { return "translate(" + i * barWidth + ",0)"; });

  bar.append("rect")
      .attr("y", function(d) { return y(d.rain); })
      .attr("height", function(d) { return height - y(d.rain); })
      .attr("width", barWidth - 1);

  bar.append("text")
      .attr("x", barWidth / 2)
      .attr("y", function(d) { return y(d.rain) + 3; })
      .attr("dy", ".75em")
      .text(function(d) { return d.rain; });

  // DEEL 2

  chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  chart.append("g")
      .attr("class", "y axis")
      .call(yAxis);
    // .append("text")
    //   .attr("transform", "rotate(-90)")
    //   .attr("y", 6)
    //   .attr("dy", ".71em")
    //   .style("text-anchor", "end")
    //   .text("Frequency");

  chart.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.date); })
      .attr("y", function(d) { return y(d.rain); })
      .attr("height", function(d) { return height - y(d.rain); })
      .attr("width", x.rangeBand());
});


function type(d) {
  // d.date = d.date;
  d.rain = +d.rain; // coerce to number
  return d;
}
