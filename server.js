const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const crypto = require("crypto");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const multer = require("multer");
const upload = multer({dest: "uploads/"});

const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0/\/\P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.post("/create", upload.single('image'), function(req, res, next) {
  console.log(req.body);
  console.log(req.file);
})
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
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
