/**
** Flora Boudewijnse
** Student number: 10196153
**
** Program that creates a scatterplot visualisation of data using the D3
** library. Visualisation is aided by a SVG-made legend.
**
** Source: https://bl.ocks.org/mbostock/3887118
**/

// set plot margins
var margin = {top: 20, right: 20, bottom: 30, left: 40},
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// save scale functions for all
var x = d3.scale.linear().range([0, width]);
var y = d3.scale.linear().range([height, 0]);
var color = d3.scale.category10();

// define x-axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

// define y-axis
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// load data from jsonfile
d3.json("lifeExpectancyVsGDP.json", function(error, data) {
  if (error) throw error;


  data.forEach(function(d) {
    d.gdp =+d.gdp;
    d.life_expectancy =+d.life_expectancy;
  });

  // console.log(data);
  x.domain(d3.extent(data, function(d) { return d.gdp; })).nice();
  y.domain(d3.extent(data, function(d) { return d.life_expectancy; })).nice();

  // write x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("GDP (USD per capita)");

  // write y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Age (years)")

  // place dots
  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", function(d) { return x(d.gdp); })
      .attr("cy", function(d) { return y(d.life_expectancy); })
      .style("fill", function(d) { return color(d.europe); });

  // make legend
  var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i)
           { return "translate(0," + i * 23 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });

});
