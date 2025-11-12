const mongoose = require("mongoose");
const validator = require('validator')

const urlSchema = new mongoose.Schema(
  {
    full_url: {
      type: String,
      required: true,
      validate: {
        validator: (v) =>
          validator.isURL(v, {
            protocols: ["http", "https"],
            require_protocol: true,
          }),
        message: "Invalid URL format",
      },
    },
    short_url: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    clicks: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const shortUrl = mongoose.model("shortUrl", urlSchema);
module.exports = shortUrl;
