/**
** Flora Boudewijnse
** Student number: 10196153
**
** Program that ...
**
** Sources
** line chart: https://bl.ocks.org/mbostock/3883245,
** multi-series line chart: https://bl.ocks.org/mbostock/3884955
** simple line graph in d3.js: http://bl.ocks.org/d3noob/4414436
** crosshairs: http://bl.ocks.org/mikehadlow/93b471e569e31af07cd3
**/

// set canvas/graph dimensions
var margin = {top: 20, right: 20, bottom: 30, left: 40},
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y%m%d").parse;

// save scale functions for all
var x = d3.time.scale().range([0, width]),
  y = d3.scale.linear().range([height, 0]),
  colour = d3.scale.category10();
// var colour = d3.scale.ordinal()
  // .domain(["min", "mean", "max"])
  // .range(["blue", "purple", "red"]);

// define x-axis
var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

// define y-axis
var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left");

// define lines min/mean/max
var minLine = d3.svg.line()
  .x(function(d) { return x(d.date); })
  .y(function(d) { return y(d.min); });

var meanLine = d3.svg.line()
  .x(function(d) { return x(d.date); })
  .y(function(d) { return y(d.mean); });

var maxLine = d3.svg.line()
  .x(function(d) { return x(d.date); })
  .y(function(d) { return y(d.max); });

// make + fill svg and g elements
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// load data from jsonfile
d3.json("knmi_temp.json", function(error, data) {
  if (error) throw error;

  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.max =+d.max;
    d.mean =+d.mean;
    d.min =+d.min;
  });

  // scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date; })).nice();
  y.domain([d3.min(data, function(d) { return d.min; }),
            d3.max(data, function(d) { return d.max; })]).nice();
  // colours.domain(fluctuations.map(function(f) { return f.id; }));

  // write x-axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .select(".domain")
      .remove();

  // write y-axis
  svg.append("g")
      .call(yAxis)
    .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      // .style("stroke-width", "1px")
      .text("Temperature per day (in 0.1 degree Celcius)");

  // add lines min/mean/max
  svg.append("path")
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("d", minLine(data));

  svg.append("path")
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", "purple")
    .attr("d", meanLine(data));

  svg.append("path")
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("d", maxLine(data));

  // add crosshairs
  svg.append("g").append("rect")
    .attr("class", "overlay")
    .on("mouseover", function() { })
});
