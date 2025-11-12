require("dotenv").config({ path: "../.env" });
const express = require("express");
const { connectDB } = require("./config/database");
const urlRouter = require("./routes/urlRoute");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler")

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//routes
app.use(urlRouter);

//error handling
app.use(errorHandler)

//connect to DB
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("server started");
    });
  })
  .catch((err) => {
    console.log(err);
  });
