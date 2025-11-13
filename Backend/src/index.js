require("dotenv").config({ path: "../.env" });
const express = require("express");
const { connectDB } = require("./config/database");
const urlRouter = require("./routes/urlRoute");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler")
const path = require("path");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL
  })
);

//routes
app.use(urlRouter);

app.use(express.static(path.join(__dirname, "..", "dist")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

//error handling
app.use(errorHandler)

//connect to DB
connectDB()
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((err) => {});
