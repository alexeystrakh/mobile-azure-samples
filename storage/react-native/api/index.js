const {
  Aborter,
  BlockBlobURL,
  ContainerURL,
  ServiceURL,
  SharedKeyCredential,
  StorageURL
} = require("@azure/storage-blob");

const fs = require("fs");
const path = require("path");

const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.options("*", cors());

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const STORAGE_ACCOUNT_NAME = "<YOUR_STORAGE_ACCOUNT_NAME>";
const CONTAINER_NAME = "<YOUR_CONTAINER_NAME>";
const ACCOUNT_ACCESS_KEY = "<YOUR_ACCOUNT_ACCESS_KEY>";

const ONE_MINUTE = 60 * 1000;

async function showBlobNames(aborter, containerURL, res, req) {
  try {
    let response;
    let marker;

    do {
      response = await containerURL.listBlobFlatSegment(aborter);
      marker = response.marker;
      for (let blob of response.segment.blobItems) {
        blob.blobUrl = containerURL.url + "/" + blob.name;
      }
    } while (marker);
    res.status(200).send(response.segment.blobItems);
  } catch (e) {
    console.log(e);
    res.status(500).send("Error occured getting blob names");
  }
}

var blobName = "";
let localFilePath = "";

const credentials = new SharedKeyCredential(
  STORAGE_ACCOUNT_NAME,
  ACCOUNT_ACCESS_KEY
);
const pipeline = StorageURL.newPipeline(credentials);
const serviceURL = new ServiceURL(
  `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
  pipeline
);

const containerURL = ContainerURL.fromServiceURL(serviceURL, CONTAINER_NAME);

const aborter = Aborter.timeout(30 * ONE_MINUTE);

app.get("/api/blob", function(req, res, next) {
  showBlobNames(aborter, containerURL, res, req).catch(next);
});

app.post("/api/blob", async function(req, res, next) {
  /* For debugging code*/
  console.log("file object");
  console.log(req.files);
  console.log("data");
  console.log(req.files.blobFile);
  console.log("Buffer data");
  console.log(req.files.blobFile.data);
  console.log("Buffer length");
  console.log(req.files.blobFile.data.length);
  /* For debugging*/

  const blockBlobURL = BlockBlobURL.fromContainerURL(
    containerURL,
    req.files.blobFile.name
  );

  try {
    await blockBlobURL.upload(
      aborter,
      req.files.blobFile.data,
      req.files.blobFile.data.length
    );
    // uploadStream(aborter, containerURL, fileName);
    console.log(`Local file "${localFilePath}" is uploaded as a stream`);
    res.status(200).send({ status: "File uploaded successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).send("Error occured getting blob names");
  }
});

app.put("/api/blob", async function(req, res, next) {
  try {
    console.log("delete end point called");
    console.log(req.body);
    const blockBlobURL = BlockBlobURL.fromContainerURL(
      containerURL,
      req.body.name
    );
    await blockBlobURL.delete(aborter);
    res.status(200).send({ status: "File deleted successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).send("Error occured getting blob names");
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
