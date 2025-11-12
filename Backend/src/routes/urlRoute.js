const express = require("express");
const urlRouter = express.Router();
const validator = require("validator");
const { nanoid } = require("nanoid");
const shortUrl = require("../models/url");
const { validateShortId } = require("../utils/validator");
const createUrlLimiter = require("../middleware/rateLimit");

urlRouter.post("/url", createUrlLimiter, async (req, res, next) => {
  try {
    const { url } = req.body;
    if (/^(https?:\/\/)?(localhost|127\.0\.0\.1)/.test(url)) {
      res.status(400);
      throw new Error("Localhost URLs are not allowed");
    }
    if (
      !validator.isURL(url, {
        protocols: ["http", "https"],
        require_protocol: true,
      })
    ) {
      res.status(400);
      throw new Error("Pls enter correct URL");
    }

    let shortId = nanoid(8);
    while (await shortUrl.findOne({ short_url: shortId })) {
      shortId = nanoid(8);
    }
    const generatedUrl = await shortUrl.create({
      full_url: url,
      short_url: shortId,
    });

    res.status(201).json({ shortUrl: `${shortId}` });
  } catch (err) {
    next(err);
  }
});

urlRouter.get("/:id", createUrlLimiter, async (req, res, next) => {
  try {
    const shortId = req.params.id;

    //validating user url for security
    validateShortId(shortId);

    const redirectUrl = await shortUrl.findOneAndUpdate(
      { short_url: shortId },
      { $inc: { clicks: 1 } }
    );
    if (!redirectUrl) {
      res.status(404);
      throw new Error("Pls enter correct ID");
    }
    res.redirect(redirectUrl.full_url);
  } catch (error) {
    next(error);
  }
});

urlRouter.get("/:id/analytics", createUrlLimiter, async (req, res, next) => {
  try {
    const shortId = req.params.id;

    //validating user url for security
    validateShortId(shortId);

    const url = await shortUrl.findOne({ short_url: shortId });
    if (!url) {
      res.status(404);
      throw new Error("Short URL not found");
    }
    res.status(200).json({ data: url });
  } catch (error) {
    next(error);
  }
});

module.exports = urlRouter;
