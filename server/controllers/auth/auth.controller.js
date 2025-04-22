const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user.model");
require("dotenv").config();

// Registration Controller
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });

    if (checkUser) {
      return res.json({
        success: false,
        message: "User Already Exist or Registered With Same Email!",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Registration is Successfull",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Registration is Failed! Please try again",
    });
  }
};

// Login Controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });

    if (!checkUser) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist! Please register first.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, checkUser.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password! Please try again.",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      process.env.JWT_SECRET || "CLIENT_SECRET_KEY", // use env var if possible
      { expiresIn: "60m" }
    );

    console.log("Environment:", process.env.NODE_ENV);
    // Set cookie properly
    // res
    //   .cookie("token", token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production", // true only in production
    //     sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    //     maxAge: 60 * 60 * 1000, // 1 hour
    //   })
    //   .status(200)
    //   .json({
    //     success: true,
    //     message: "Logged in successfully",
    //     token: token,
    //     user: {
    //       userName: checkUser.userName,
    //       email: checkUser.email,
    //       role: checkUser.role,
    //       id: checkUser._id,
    //     },
    //   });

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token: token,
      user: {
        userName: checkUser.userName,
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      success: false,
      message: "Login failed. Please try again!",
    });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

//auth middleware
const authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    console.log("Token Auth: ", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user! No token provided.",
      });
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "CLIENT_SECRET_KEY"
      );
      req.user = decoded;
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
        error: err.message,
      });
    }

    // ✅ Call next only if everything is fine
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user! Invalid token.",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
