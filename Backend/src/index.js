require("dotenv").config({ path: "../.env" });
const express = require("express");
const { connectDB } = require("./config/database");
const urlRouter = require("./routes/urlRoute");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler")
const path = require("path");

const app = express();
app.set("trust proxy", 1);

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL
  })
);

//routes
app.use("/api", urlRouter);

if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../../Frontend/dist");

  app.use(express.static(distPath));

  // 👇 IMPORTANT: block fallback from catching API routes
  app.use((req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }
    res.sendFile(path.join(distPath, "index.html"));
  });
}

//error handling
app.use(errorHandler)

//connect to DB
connectDB()
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((err) => {});
