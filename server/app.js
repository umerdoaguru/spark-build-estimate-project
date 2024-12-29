const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
const { db } = require("./db");
dotenv.config();
const bodyParser = require("body-parser");


const Router = require("./routers/userdataroutes");
const Router1 = require("./routers/adminroutes");

const app = express();

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use("/api", Router);
app.use("/api", Router1);

app.use(cors({ origin: "http://localhost:3000" }));
app.use("/Assets", express.static(path.join(__dirname, "Assets")));

console.log("Fetching data from API...Kar raha he");



const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
