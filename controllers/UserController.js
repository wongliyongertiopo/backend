const User = require("./../models/User");

// Mendapatkan semua pengguna
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Menambahkan pengguna baru
exports.createUser = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Cek data yang masuk ke server

    // Membuat pengguna baru
    const user = new User(req.body);
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    console.error("Error saat menyimpan user:", err);
    res.status(400).json({ message: err.message });
  }
};
