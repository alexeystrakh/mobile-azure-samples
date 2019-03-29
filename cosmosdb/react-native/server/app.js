const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const todo = require("./routes/todo");
const db = require("./db.js");
const cookieParser = require("cookie-parser");

app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "5mb" }));
app.use(cookieParser());
app.use(
  cors({
    exposedHeaders: ["Link"]
  })
);

app.use(todo);

app.listen(process.env.PORT || 3036, () => {
  console.log(`Started on port 3036`);
});
