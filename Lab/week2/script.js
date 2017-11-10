/**
** Name: Flora Boudewijnse
** Student number: 10196153
**
** This program draws a graph displaying the temperature in 2016 in de Bilt
**/

window.onload = function() {
	var raw_data = document.getElementById("rawdata").value.split("	");
	var sliced = raw_data.slice(1);

	var temps = [], dates = [];

	for (i = 0; i < sliced.length; i++) {
		if (i % 2 == 0) {
			dates.push(sliced[i]);
		} else {
			temps.push(Number(sliced[i]));
		}
	}

	var new_dates = [];
	var one_day = 1000 * 60 * 60 * 24;

	for (i = 0; i < dates.length; i++) {
		// slice size based on data notation "....-..-.."
		var part1 = dates[i].slice(0, 4);
		var part2 = dates[i].slice(4, 6);
		var part3 = dates[i].slice(6);
		new_dates[i] = new Date (part1 + "-" + part2 + "-" + part3);

		// idea from https://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
		var current = new_dates[i].getTime();
		var first_day = new Date ("2016-01-01").getTime();
		var time_lapsed = current - first_day + 1;
		new_dates[i] = Math.ceil(time_lapsed / one_day);

	}

	draw_graph(new_dates, temps);
}


function draw_graph (dates, temps) {
	// draw empty canvas
	var canvas = document.getElementById("my_canvas");
	var ctx = canvas.getContext("2d");

	// draw title
	ctx.font = "20px Arial";
	ctx.fillText("Maximum temperature in De Bilt (NL) in 2016", 100, 39);

	// draw x-axis
	ctx.moveTo(52, 339);
	ctx.lineTo(552, 339);
	ctx.stroke();

	// draw y-axis line
	ctx.moveTo(42, 339);
	ctx.lineTo(42, 39);
	ctx.stroke();

	// draw x-axis values and value lines
	// var months = ["jan", "feb", "mar", "apr", "may", "june", "july", "aug", \
	// 							"sept", "oct", "nov", "dec"];
	var x_axis = 52;
	var x_value_distance = (552 + 52)/12;
	ctx.font = "12px Arial";

	for (i = 0; i < 12; i++) {
		ctx.moveTo(x_axis, 344);
		ctx.lineTo(x_axis, 339);
		ctx.stroke();
		// ctx.fillText(months[i], x_axis, 45);
		x_axis += x_value_distance;
	}

	// draw y-axis values and value lines
	var max_temp = Math.max(temps), min_temp = -50;
	var cur_temp = -50;
	var y_axis = 339;
	var y_value_distance = (339 - 39)/8;
	// ctx.font = "12px Arial";

	for (i = 0; i < 9; i++) {
		ctx.moveTo(42, y_axis);
		ctx.lineTo(37, y_axis);
		ctx.stroke();
		ctx.fillText(cur_temp, 15, y_axis + 4);
		y_axis -= y_value_distance;
		cur_temp += 50;
	}

	// data
	var range_x = [52, 552];
	var domain_x = [1, 366];
	var create_x = createTransform(domain_x, range_x);

	// temps
	var range_y = [39, 339];
	var domain_y = [-50, 350];
	var create_y = createTransform(domain_y, range_y);

	var x_old, y_old;
	var x = create_x(dates[0]);
	var y = create_y(temps[0]);

	// draw graph
	ctx.beginPath();
	ctx.moveTo(x_old, y_old);

	for (i = 0; i < 366; i++) {
		x_old = x;
		y_old = y;
		x = create_x(dates[i]);
		y = create_y(temps[i]);
		ctx.lineTo(x, y);
	}
	ctx.stroke();
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
