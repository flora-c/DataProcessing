// Name: Flora Boudewijnse
// Student number: 10196153

window.onload = function() {
	var raw_data = document.getElementById("rawdata").value.split("	");
	// .split("	")
	// "\n", "	"
	console.log(raw_data);

	var sliced = raw_data.slice(1);
	// var raw_data_lines = raw_data.split("\n", " ");
	console.log(sliced);

	// for loop voor de andere slice
	// bekijk welke input de figuur wil hebben
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