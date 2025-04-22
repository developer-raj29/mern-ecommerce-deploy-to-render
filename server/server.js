const express = require("express");

const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;

const connect = require("./config/mongo.db");
connect();

const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth.routes");
const adminProductsRouter = require("./routes/admin/products.routes");

const shopProductsRouter = require("./routes/shop/products.routes");
const shopCartRouter = require("./routes/shop/cart.routes");
const shopAddressRouter = require("./routes/shop/address.routes");
const shopOrderRouter = require("./routes/shop/order.routes");
const shopSearchRouter = require("./routes/shop/search.routes");
const shopReviewRouter = require("./routes/shop/product.review.routes");

const commonFeatureRouter = require("./routes/common/feature.routes");

app.use(
  cors({
    // origin: ["http://localhost:5173" || process.env.FRONTEND_URL],
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true, // Allows cookies to be sent
  })
);

app.use(cookieParser());

app.use(express.json());

app.use("/api/auth", authRouter);

app.use("/api/admin/products", adminProductsRouter);

app.use("/api/shop/products", shopProductsRouter);

app.use("/api/shop/cart", shopCartRouter);

app.use("/api/shop/address", shopAddressRouter);

app.use("/api/shop/order", shopOrderRouter);

app.use("/api/shop/search", shopSearchRouter);

app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", commonFeatureRouter);
app.get("/", (req, res) => {
  res.send(
    `New MERN E-commerce web-app Backend Start on PORT No. ${PORT} successfully`
  );
});

app.listen(PORT, () => {
  console.log(`Server App running Successfully PORT No. ${PORT}....`);
});
