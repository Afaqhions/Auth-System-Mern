// importing mongoose auth model
import  AuthModel from '../Model/auth.model.js'

// Importing bycrypt
import bcrypt from "bcrypt"

// Login Controller
export const loginUser = async (req, res) => {
    try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({ message: "Email & Password are required." });
    }

    // Check if user exists
    const user = await AuthModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not registered." });
    }

    // Compare password with hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Success
    return res.status(200).json({ message: "Login successful." });

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error during login." });
  }
}

// Signup Controller
export const SignupUser = async (req, res) => {
    try {
    const { name, email, password } = req.body;

    // Check for required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if user already exists
    const isUserExists = await AuthModel.findOne({ email });
    if (isUserExists) {
      return res.status(400).json({ message: "User already registered." });
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user with hashed password
    const user = new AuthModel({ name, email, password: hashedPassword });
    await user.save();

    return res.status(201).json({ message: "User created successfully." });

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
}