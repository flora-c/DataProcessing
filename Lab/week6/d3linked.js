/**
** Flora Boudewijnse
** Student number: 10196153
**
** Program that ...
**
** Sources
** D3: Queue.js (http://bl.ocks.org/mapsam/6090056)
**
**
**/

// set canvas/graph dimensions
var margin = {top: 20, right: 20, bottom: 30, left: 40},
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// make + fill svg and g elements
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var q = d3.queue()
  .defer(d3.json, "./json/drenthe.json")
  .defer(d3.json, "./json/nederland.json")
  .await(draw);

function draw(error, drenthe, nederland){
  if (error) throw error;

  console.log(drenthe, nederland);

}
