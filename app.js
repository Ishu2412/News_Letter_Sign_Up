const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req, res){
  const firstName = req.body.one;
  const lastName = req.body.two;
  const email = req.body.three;

  const data = {
    members:[{
      email_address : email,
      status : "subscribed",
      merge_fields : {
        FNAME : firstName,
        LNAME : lastName,
          }
        }
    ]
  }

const jsonData = JSON.stringify(data);

const url = "https://us11.api.mailchimp.com/3.0/lists/e871a78053";

const options = {
  method: "POST",
  auth: "Shrayash:d5426f303d41653315a4f50e5fcfb75b-us11",
}

const request = https.request(url, options, function(response){
  if(response.statusCode === 200){
    res.sendFile(__dirname + "/success.html");
}
else {
  res.sendFile(__dirname + "/failure.html");
}

  response.on("data", function(data){
    console.log(JSON.parse(data));
  })
});

request.write(jsonData);
request.end();
});

app.post("/failure",function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
  console.log("Server is listening on port 3000 .....");
});


// API key
// d5426f303d41653315a4f50e5fcfb75b-us11

// Audience //
// e871a78053
