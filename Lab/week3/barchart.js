/**
** Flora Boudewijnse
** Student number: 10196153
**
** Program that draws a barchart using data from a json file.
** Source: https://bost.ocks.org/mike/bar/
**
**/

// set chart margins
var margin = {top: 20, right: 30, bottom: 60, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set chart size
var width = 720, height = 375;

// set range
var x = d3.scale.ordinal().rangeRoundBands([0, width])
var y = d3.scale.linear().range([height, 0]);

// define axes
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "* 0,1 hour");


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

  // calculate bars
  var barWidth = width / data.length;
  var bar = chart.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d, i)
        { return "translate(" + i * barWidth + ", 0)"; });

  // x axis
  chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-45)" );

  // y axis
  chart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Daily duration of rainfall (in 0,1 hour)");

  // draw bars
  bar.append("rect")
      .attr("y", function(d) { return y(d.rain); })
      .attr("height", function(d) { return height - y(d.rain); })
      .attr("width", barWidth - 1);

  // write text in bars
  bar.append("text")
      .attr("x", barWidth / 2)
      .attr("y", function(d) { return y(d.rain) + 3; })
      .attr("dy", ".75em")
      .text(function(d) { return d.rain; });


});


function type(d) {
  //d.date = +d.date;
  d.rain = +d.rain; // coerce to number
  return d;
}
