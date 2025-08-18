// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// ✅ Check: Make sure createOrUpdateTransaction is defined and exported in the controller

router.post('/transactions', transactionController.createOrUpdateTransaction);
router.put('/transactions', transactionController.createOrUpdateTransaction);
router.delete('/transactions:transactionsCode', transactionController.deleteTransaction);
router.get('/transactions', transactionController.getAllTransactions);

module.exports = router;
