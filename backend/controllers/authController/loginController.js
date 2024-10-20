const User = require("../../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", error: true });
    }

    // Find the user in the database
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        message: "User does not exist. Please sign up and try again.",
        error: true,
      });
    }

    // Match the password
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials. Please try again.",
        error: true,
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    // Assign token and remove sensitive info before sending user data
    existingUser.password = undefined;

    // Set cookie options
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use 'secure' in production
      sameSite: process.env.NODE_ENV === "production" ? "Lax" : "None", // 'Lax' for localhost
    };

    // Send response with token in cookie
    res.status(200).cookie("token", token, options).json({
      success: true,
      user: existingUser,
      token: token,
      message: "Logged in successfully!",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error", error: true });
  }
};

module.exports = loginController;
