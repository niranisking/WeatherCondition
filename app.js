const express = require('express');

const https = require('node:https');

const bodyParser = require('body-parser');

app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html")

    
    
})


app.post("/", function(req, res){

var cityName = req.body.cityname


const query = cityName

    const apikey = "1d15daad344d29d52671ec837e25c9fc"

    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apikey + '&units=metric'

  
    
    https.get( url , function(response){
        


        response.on("data", function(data){
        

                const weatherData = JSON.parse(data)

                const weatherDataTemp = weatherData.main.temp

                const weatherDataDescription = weatherData.weather[0].description

                const weatherDataIcon = weatherData.weather[0].icon

                console.log(weatherDataTemp + "," + weatherDataDescription);

                res.write("<h1>The temperature in " + query + " is " + weatherDataTemp + " degree celcius</h1>")

                res.write("<h1> The weather is currently a " + weatherDataDescription + "</h1>" )

                

                

                const weatherDataImageUrl = "https://openweathermap.org/img/wn/" + weatherDataIcon + "@2x.png"

                res.write("<img src = " + weatherDataImageUrl + ">")
        })

    })
    

   
})

app.listen(5000, function(){
    console.log("server started on port 5000...")
})