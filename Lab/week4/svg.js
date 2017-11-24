/**
** Flora Boudewijnse
** Student number: 10196153
**
** Program that writes and colors a legend
**
**/

d3.xml("test.svg", "image/svg+xml", function(error, xml) {
    if (error) throw error;
    document.body.appendChild(xml.documentElement);

  var colorId = ["kleur4", "kleur5", "kleur6", "kleur7"];
  var colorY = ["138.7", "180.35", "221.9", "260.9"];
  var colorHex = ["#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#005824", "grey"];

  // draw remaining color boxes
  for (i = 0; i < colorId.length; i++) {
    d3.select("svg")
      .append("rect")
        .attr("id", colorId[i])
        .attr("x", "13")
        .attr("y", colorY[i])
        .attr("class", "st1")
        .attr("width", "21")
        .attr("height", "29");
  }

  // colorise color boxes with colorHex
  d3.selectAll(".st1")
    .style("fill", function(d, i) { return colorHex[i]});

  var textId = ["text5", "text6", "text7"];
  var textY = ["180.35", "221.9", "260.9"];
  var textBox = ["1000", "10.000", "100.000", "1.000.000", "10.000.000", "Unknown Data"];

  // draw remaining text boxes
  for (i = 0; i < textId.length; i++) {
    d3.select("svg")
      .append("rect")
        .attr("id", textId[i])
        .attr("x", "46.5")
        .attr("y", textY[i])
        .attr("class", "st2")
        .attr("width", "119.1")
        .attr("height", "29");
  }

  // write text in text boxes
  // first text box
  d3.select("svg")
    .append("text")
      .attr("x", "50.5")
      .attr("y", "35.5")
      .attr("font-family", "verdana")
      .attr("font-size", "10px")
      .text("100");
      // .text(function(d, i) { return textBox[i]; });

  var textY = ["80.5", "120.4", "160.3", "200.2", "240.1", "280"]; //39.9
  // rest of the text boxes
  for (i = 0; i < textBox.length; i++) {
  d3.select("svg")
    .append("text")
      .attr("x", "50.5")
      .attr("y", textY[i])
      .attr("font-family", "verdana")
      .attr("font-size", "10px")
      .text(textBox[i]);
    }
});
