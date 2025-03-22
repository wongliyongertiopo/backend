const Transaction = require("../models/Transaction");
const midtransClient = require("midtrans-client");

// Menambahkan transaksi baru
exports.createTransaction = async (req, res) => {
  try {
    const { first_name, amount, product_id } = req.body; // Perbaikan destructuring
    // Buat instance Snap Midtrans
    let snap = new midtransClient.Snap({
      isProduction: false, // Set ke true jika sudah dalam produksi
      serverKey: process.env.MIDTRANS_SERVERKEY,
    });

    const order_id = "ORDER-" + new Date().getTime(); // Order ID unik

    // Parameter transaksi untuk Midtrans
    const parameter = {
      transaction_details: {
        order_id: order_id,
        gross_amount: amount,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: first_name,
      },
    };

    // Membuat transaksi di Midtrans
    const transaction = await snap.createTransaction(parameter);

    // Ambil redirect URL dari Midtrans
    const transactionUrl = transaction.redirect_url;

    // Simpan transaksi ke database
    const newTransaction = new Transaction({
      ...req.body, // Data transaksi lainnya
      transaction_id: order_id, // Menyimpan order ID unik
      midtrans_url: transactionUrl, // URL pembayaran dari Midtrans
    });

    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message }); // Diperbaiki dari req.status ke res.status
  }
};
