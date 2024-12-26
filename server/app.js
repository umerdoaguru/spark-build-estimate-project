const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
const { db } = require("./db");
dotenv.config();
const bodyParser = require("body-parser");

const Router4 = require("./routers/employeRouter");
const Router2 = require("./routers/organizationRoutes");
const Router3 = require("./routers/dashboardRoutes");
const Router = require("./routers/userdataroutes");
const Router5 = require("./routers/response_99acres");
const Router6 = require("./routers/FacebookRoutes");
const Router7 = require("./routers/WebsiteRoutes");

const app = express();

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use("/api", Router3);
app.use("/api", Router2);
app.use("/api", Router4);
app.use("/api", Router);
app.use("/api", Router5);
app.use("/api", Router6);
app.use("/api", Router7);
app.use(cors({ origin: "http://localhost:3000" }));
app.use("/Assets", express.static(path.join(__dirname, "Assets")));

console.log("Fetching data from API...Kar raha he");



const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
