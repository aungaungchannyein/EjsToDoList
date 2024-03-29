const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js")

const app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.set('view engine', 'ejs');


const items=[]
const workItems=[]

app.get("/", function(req,res){
	let day = date.getDate()
	res.render("list",{listTitle:day,newListItems: items});
})

app.post("/", function(req,res){
	let item = req.body.newItem

	// console.log(req.body.list)
	if (req.body.list === "Work List" ){
		workItems.push(item)
		res.redirect("/work")
	}
	else {
		items.push(item)
		res.redirect("/")
	}


})

app.get("/work", function(req,res){
	res.render("list",{listTitle: "Work List", newListItems: workItems});

});




app.listen(process.env.PORT || 3000, function(){
	console.log("Server is running on port 3000");
})