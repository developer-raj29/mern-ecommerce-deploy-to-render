const express = require("express");
const router = express.Router();
const {
  createOrder,
  captureOrder,
} = require("../../controllers/auth/paypal.controller");

// ✅ Route to create a new PayPal order
router.post("/create-order", createOrder);

// ✅ Route to capture an approved PayPal order
router.post("/capture-order", captureOrder);

module.exports = router;
