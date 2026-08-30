const express = require("express");
const path = require("path");

const connectDatabase = require("./config/database");
const webRoutes = require("./routes/webRoutes");
const apiRoutes = require("./routes/apiRoutes");

const app = express();
const rootDir = path.resolve(__dirname, "..");

connectDatabase();

app.use(express.static(rootDir));
app.use("/images", express.static(path.join(rootDir, "images")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", webRoutes);
app.use("/api", apiRoutes);

module.exports = app;
