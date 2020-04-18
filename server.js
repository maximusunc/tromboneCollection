const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const CryptoJS = require('crypto-js');
const routes = require("./routes");

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ limit: "20mb", extended: false }));
app.use(bodyParser.json({ limit: "20mb" }));


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
};

// handles admin password
app.get("/login/:password", function(req, res) {
  const hash = CryptoJS.HmacSHA256(req.params.password, process.env.PSWD_SECRET || 'local_test');
  if (process.env.PSWD_SECRET) {
    if (decodeURI(hash) === "2ceff18447880e20f63796ae330ca5ef90de5fdc576068ee3422a8bb7503225f") {
      res.status(200).send("Authorized");    
    } else {
      res.status(401).send("Unauthorized");
    };
  } else {
    if (decodeURI(hash) === "065730ada2dd4669658f3b6221dd543d8073708a0d00309d7bff2d8b57c538cc") {
      res.status(200).send("Authorized");    
    } else {
      res.status(401).send("Unauthorized");
    };
  }
});

// Add routes, both API and view
app.use(routes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/tromboneCollection",
  { useNewUrlParser: true }
);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
