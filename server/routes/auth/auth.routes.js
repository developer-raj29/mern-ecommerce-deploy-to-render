const express = require("express");
const router = express.Router();

// import controllers
const {
  registerUser,
  loginUser,
  authMiddleware,
  logoutUser,
} = require("../../controllers/auth/auth.controller");

// write api route with controllers

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

// export
module.exports = router;
