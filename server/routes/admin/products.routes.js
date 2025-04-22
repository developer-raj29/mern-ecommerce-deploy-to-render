const express = require("express");
const router = express.Router();

const { upload } = require("../../config/cloudinary.db");
const {
  handleImageUpload,
  addProduct,
  updateProduct,
  deleteProduct,
  fetchAllProducts,
} = require("../../controllers/admin/products.controller");

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addProduct);
router.put("/edit/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/allProducts", fetchAllProducts);

module.exports = router;
