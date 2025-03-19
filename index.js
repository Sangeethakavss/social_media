const express = require("express");
const app = express();
const cors = require("cors");

const port = 3000;
const db = require("./database/index.js");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

app.use(express.json());
app.use(cors());

const authRouter = require("./router/auth.js");
app.use("/auth", authRouter);

app.post("/dom-request", (req, res) => {
  try {
    const { htmlString } = req.body;
    const fileName = "index.html";
    const filePath = path.join(__dirname, fileName);
    fs.writeFileSync(filePath, htmlString);
    res.status(200).send("File created successfully");

  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
