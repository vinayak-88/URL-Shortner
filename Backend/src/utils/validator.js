const SHORTID_REGEX = /^[A-Za-z0-9_-]{8}$/;

const validateShortId = (shortId) => {
  if (typeof shortId !== "string" || !SHORTID_REGEX.test(shortId)) {
    const error = new Error("Invalid short ID format")
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {validateShortId};
