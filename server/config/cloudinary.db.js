const cloudinary = require("cloudinary").v2;
const multer = require("multer");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET_KEY,
});

const storage = new multer.memoryStorage();

const imageUploadUtil = async (file) => {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
};

// const imageUploadUtil = async (file, folder, height, quality) => {
//   const options = { folder };

//   if (height) {
//     options.height = height;
//   }
//   if (quality) {
//     options.quality = quality;
//   }
//   options.resource_type = "auto";

//   return await cloudinary.uploader.upload(file.tempFilePath, options);
// };

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
