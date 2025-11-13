require("dotenv").config({ path: "../.env" });
const express = require("express");
const { connectDB } = require("./config/database");
const urlRouter = require("./routes/urlRoute");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler")
const path = require("path");
const shortUrl = require("./models/url"); 

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

//redirect api
app.get("/:id", async (req, res, next) => {
  try {
    const shortId = req.params.id;

    const redirectUrl = await shortUrl.findOneAndUpdate(
      { short_url: shortId },
      { $inc: { clicks: 1 } }
    );

    if (!redirectUrl) return res.status(404).send("Invalid short URL");

    return res.redirect(redirectUrl.full_url);
  } catch (err) {
    next(err);
  }
});

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
