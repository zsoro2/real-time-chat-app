const sharp = require("sharp");

const userImageValidation = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const image = await sharp(req.file.path);
    const metadata = await image.metadata();

    if (metadata.width < 500 || metadata.height < 500) {
      return res
        .status(400)
        .json({ error: "Image dimensions must be at least 500x500 pixels." });
    }

    return next();
  } catch (error) {
    return res.status(502).json({ error: "Failed to process image." });
  }
};

module.exports = {
  userImageValidation,
};
