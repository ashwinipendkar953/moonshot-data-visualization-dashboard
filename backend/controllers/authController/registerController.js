const User = require("../../models/UserModel");
const bcrypt = require("bcryptjs");

const registerController = async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;
  try {
    // Validate required fields
    if (!fullName || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ message: "All fields are required", error: true });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password do not match", error: true });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists", error: true });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error: true });
  }
};

module.exports = registerController;
