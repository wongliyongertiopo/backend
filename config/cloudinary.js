const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY_API,
  api_secret: process.env.CLOUDINARY_KEY_SECRET,
});

module.exports = cloudinary;
