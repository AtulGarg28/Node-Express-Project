const express = require("express");
const requests = require("requests");
const hbs = require('hbs');
const path = require("path");
const app = express();
const port = process.env.PORT || 8000;

const indexPath = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

console.log(indexPath);

app.set("view engine",'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(indexPath));

app.get("/",(req,res)=>{
    res.render('index');
});
app.get("/about",(req,res)=>{
    res.render('about');
    // res.send("Welcome about here.");
});
// app.get("/weather",(req,res)=>{
//     requests(
//         `http://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=1e91e2a2e0761eee9f5c633e3cb4327d`
//     )
//     .on("data",(chunkdata)=>{
//         res.render('weather');
//     })
//     .on("end",(err)=>{
//         console.log(`Error occured:- ${err}`);
//         res.end();
//     });
// });

app.get("/weather",(req,res)=>{
        res.render('weather');
});
app.get("*",(req,res)=>{
    res.render('404error',{
        errMsg : 'Oops, Page Not Found'
    });
});
app.listen(port,(err)=>{
    console.log(`Running on ${port}`);
})