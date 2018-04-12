const express = require("express");
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 3001;
const app = express();
const crypto = require("crypto");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const multer = require("multer");
const upload = multer({dest: "./client/public/images/trombones/"});

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

// app.post("/create", upload.any(), function(req, res, next) {
//   let base64string = req.body.image.replace(/^data:image\/[a-z]+;base64,/, "");
//   let imageType = req.body.image.match(/image\/[a-z]+/)[0];
//   let imageBuffer = new Buffer(base64string, "base64");
//   console.log(imageBuffer);
//   res.send("Trombone Uploaded");
// });

app.post('/create', upload.single('image'), function(req, res, next) {
  console.log(req.body);
  console.log(req.file);
  res.json(req.file.filename);
});

app.delete('/delete/:fileName', function(req, res) {
  fs.unlink('./client/public/images/trombones/' + req.params.fileName, (err) => {
    if (err) throw err;
    res.send("Image Deleted");
  });
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
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
