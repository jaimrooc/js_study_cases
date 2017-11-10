let http = require("http"),
	fs = require("fs");



http.createServer((req, res)=>{
	setTimeout(()=>{
		fs.readFile("./index.html", (err,html)=>{
			res.writeHead(404,{});
			res.write(html);
			res.end();
		});	
	}, 300);	
}).listen(1001);