var express = require("express");

var app = express();

app.set("view engine","jade");

app.get("/", (req, res)=>{
	res.render("index", {titulo: "mi primera página con express"});
});
app.listen(1000);