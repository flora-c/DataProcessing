/**
** Name: Flora Boudewijnse
** Student number: 10196153
**
** This program does ...
**/

window.onload = function() {
	var raw_data = document.getElementById("rawdata").value.split("	");
	// console.log(raw_data);

	var sliced = raw_data.slice(1);
	// var sliced = raw_data;

	var temps = [], dates = [];

	for (i = 0; i < sliced.length; i++) {
		if (i % 2 == 0) {
			dates.push(sliced[i]);
		} else {
			temps.push(sliced[i]);
		}
	}

	var new_dates = [];
	for (i = 0; i < dates.length; i++) {
		var part1 = dates[i].slice(0, 4);
		var part2 = dates[i].slice(4, 6);
		var part3 = dates[i].slice(6);
		new_dates[i] = new Date (part1 + "-" + part2 + "-" + part3);
	}

	// var max_temp = Math.max(temps);
	// console.log(max_temp);

	// console.log(new_dates);
	// console.log(temps);

	draw_graph(new_dates, temps);
}


function draw_graph (dates, temps) {
	// draw empty canvas
	var canvas = document.getElementById("my_canvas"); // in your HTML this element appears as <canvas id="myCanvas"></canvas>
	var ctx = canvas.getContext("2d");

	// draw title
	ctx.font = "20px Arial";
	ctx.fillText("Maximum temperature in De Bilt (NL) in 2016", 100, 39)

	// draw x-axis
	ctx.moveTo(52, 339);
	ctx.lineTo(552, 339);
	ctx.stroke();

	// draw y-axis line
	ctx.moveTo(42, 339);
	ctx.lineTo(42, 39);
	ctx.stroke();

	// draw y-axis values and value lines
	var max_temp = 350, min_temp = -50;
	var cur_temp = -50;
	var value_distance = (339 + 39)/10;
	var start_value = 339;
	ctx.font = "12px Arial";

	for (i = 0; i < 9; i++) {
		ctx.moveTo(42, start_value);
		ctx.lineTo(37, start_value);
		ctx.stroke();
		// ctx.fillText("%i", cur_temp);
		start_value -= value_distance;
	}

	// draw value
	console.log(dates);
	console.log(temps);

	var domain = [42, 552];
	var range = [39, 339];

	var create = createTransform(domain, range);
	console.log(create(3));

}

function createTransform(domain, range){
	// domain is a two-element array of the data bounds [domain_min, domain_max]
	// range is a two-element array of the screen bounds [range_min, range_max]
	// this gives you two equations to solve:
	// range_min = alpha * domain_min + beta
	// range_max = alpha * domain_max + beta
		// a solution would be:

		var domain_min = domain[0]
		var domain_max = domain[1]
		var range_min = range[0]
		var range_max = range[1]

		// formulas to calculate the alpha and the beta
		var alpha = (range_max - range_min) / (domain_max - domain_min)
		var beta = range_max - alpha * domain_max


		// returns the function for the linear transformation (y= a * x + b)
		return function(x){
			return alpha * x + beta;
		}
}
