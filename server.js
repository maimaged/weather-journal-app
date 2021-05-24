// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express=require('express');
// Start up an instance of app
const app=express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = process.env.PORT || 3000;
const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)});
// start post request
app.post('/weather',(req,res)=>{
    let data =req.body;
    projectData["temp"]=data.temp;
    projectData["date"]=data.date;
    projectData["feeling"]=data.feeling;

   console.log(projectData);

})
// getting data on getData url
app.get('/getData',(req,res)=>{
    res.send(projectData);
})