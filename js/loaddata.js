// function to load timeline data
// from packages recently changed on HDX.
loadData = function() {
	d3.json('https://ds-ec2.scraperwiki.com/ti4uphj/p4tsdvgw4g8vyte/sql?q=select%20*%20from%20chages_type', function(error, json) {
	    if (error) return ('Error, my friend:' + error);

	    // parsing json
	    var p = {};
	    var date, changed_package, new_package, deleted_package;
	    date = jsonPath.eval(json, '$..date');
	    changed_package = jsonPath.eval(json, '$..changed package');
	    new_package = jsonPath.eval(json, '$..new package');
	    deleted_package = jsonPath.eval(json, '$..deleted package');

	    // selecting specific elements
	    // var data = new DataCollection(json);
	    // var topChange = data.query().max('changed package');

	    // calling another function with the results.
	    // printResults(date);

	    data = {date: date, changed: changed_package, new: new_package, deleted: deleted_package};
	    buildChart(data);
	});
};

loadData();

// sanity check
printResults = function(p) {
	console.log(p);
};
