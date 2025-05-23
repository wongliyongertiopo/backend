const User = require("../models/User"); // Perbaikan path
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Sign in
exports.signIn = async (req, res) => {
  console.log("req", req.body);
  const { email, password } = req.body;

  try {
    // Cek pengguna
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not registered" });
    }

    if (user.password !== password) {
      return res
        .status(401)
        .json({ message: "Email and password did not match" });
    }

    // Jika berhasil, kirim response dengan token
    return res.json({
      _id: user._id,
      name: user.name,
      role: user.role,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};
