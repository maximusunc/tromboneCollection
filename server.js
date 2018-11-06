const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const aws = require("aws-sdk");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
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
  if (decodeURI(req.params.password) === "SackBut#1") {
    res.status(200).send("Good password");    
  } else {
    res.status(401).send("Bad password");
  };
});

// Add routes, both API and view
app.use(routes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/tromboneCollection",
);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
  res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
  res.setHeader("Expires", "0"); // Proxies.
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
