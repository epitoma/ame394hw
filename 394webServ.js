// Load the http module to create an http server.
var http = require('http');
var url = require('url');
var querystring = require('querystring');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {

//	console.log(request.url);
	var query = url.parse(request.url).query;
	var route = request.url.split("?")[0];
	var params = querystring.parse(query);
	//console.log(request.url);
	//console.log(route);
	//console.log(params);

	if (route == "/getFibonacci") {
		response.writeHead(200, {"Content-Type": "text/plain"});
			
		var fibRecursion = function(n) {
			if (n == 2) {
				return [0, 1];
			}
			else if (n == 1) {
				return [0];
			}
			else {
				var x = fibRecursion(n-1);
				x[x.length] = x[x.length - 1] + x[x.length - 2];
				return x;
			}
		}
		
		var input = parseFloat(params.a);
		response.end("The first " + input + " Fibonacci numbers are...\n\n" + fibRecursion(input) + "\n");
	}
	else {
		response.writeHead(200, {"Content-Type": "text/plain"});
 		response.end("Unidentified Route\n");
	}

});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("\nServer running at http://127.0.0.1:8000/");