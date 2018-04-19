const express = require("express");
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 3001;
const app = express();
const aws = require("aws-sdk");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const multer = require("multer");
const upload = multer({dest: "./client/public/images/trombones/"});
const S3_BUCKET = process.env.S3_BUCKET;

aws.config.region = "us-east-1";

app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

app.delete('/removeImage', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
  };
  s3.deleteObject(params, function(err, data) {
    if (err) console.log(err);
    else console.log("image deleted");
  });
});

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

app.get("/login/:password", function(req, res) {
  if (req.params.password === "test") {
    res.send("Good password");    
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
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
