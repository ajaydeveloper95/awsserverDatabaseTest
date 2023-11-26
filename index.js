// create node application to check database
const express = require("express");
const mongoose = require("mongoose");
const app = express();

port = 5000;

app.use(express.json())

// database string or url

const dataBaseUrl =
  "mongodb://127.0.0.1:27017/AWSServerTest?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.7.0";

// connect the database
mongoose
  .connect(dataBaseUrl)
  .then(() => {
    console.log("database connect successfully");
  })
  .catch(() => {
    console.log("some issue in connect to database ");
  });

// create mongodb schema
const user = new mongoose.Schema({
  name: String,
  status: Boolean,
  mobileNumber: String,
});

// create model for using schema
const userModel = mongoose.model("userList", user);


// route
app.get("/", (req, res) => {
  res.status(200).json({ status: "success" });
});

app.get("/all", async (req, res) => {
    console.log(req)
  let data = await userModel.find();
  res.status(200).json({ status: "success", userList: data });
});

app.post("/add", async (req, res) => {
    let user = await userModel.create({ name: req.body.name, status: req.body.status, mobileNumber: req.body.mobileNumber });
    console.log(user)
  res.status(200).json({ status: "success", user });
});

app.listen(port, () => {
  console.log("server run successfully at port", port);
});
