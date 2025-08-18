// controllers/transactionController.js
const transactionModel = require('../models/transactionModel');
const db = require('../config/db');

// Backend-side TransactionCode generation (used only if not passed from frontend/import)
function generateTransactionCode() {
  return 'TRX' + Date.now(); // Can switch to formatted if needed
}

exports.createOrUpdateTransaction = async (req, res) => {
  try {
    let {
      TransactionCode,
      ClientCode,
      CompanyCode,
      SchemeCode,
      TransactionDate,
      Amount,
      CreditDebit,
      TransactionType,
      IsReturnComplete,
      Remarks
    } = req.body;

    // Step 1: Check if duplicate exists
    const [existing] = await db.query(`
      SELECT * FROM InvestmentTransaction
      WHERE ClientCode = ? AND CompanyCode = ? AND TransactionDate = ? AND TransactionType = ?
    `, [ClientCode, CompanyCode, TransactionDate, TransactionType]);

    if (existing.length > 0) {
      return res.status(409).json({ message: 'Duplicate - already imported' });
    }

    // Step 2: Generate code if not provided
    if (!TransactionCode || TransactionCode.trim() === '') {
      TransactionCode = generateTransactionCode();
    }

    // Step 3: Call SP to insert
    const [result] = await transactionModel.insertOrUpdateTransaction(
      TransactionCode,
      ClientCode,
      CompanyCode,
      SchemeCode,
      TransactionDate,
      Amount,
      CreditDebit,
      TransactionType,
      IsReturnComplete,
      Remarks
    );

    res.status(201).json({ message: 'Transaction imported successfully', data: result });

  } catch (error) {
    console.error('Error Saving Transaction:', error);
    res.status(500).json({ error: 'Transaction save failed' });
  }
};
// GET Endpoints in controllers/transactionController.js
exports.getAllTransactions = async (req, res) => {
    try {
      const [rows] = await db.query('CALL sp_GetAll_InvestmentTransaction()');
      res.json(rows[0]);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({ error: 'Failed to fetch transactions' });
    }
  };
  // UPDATE transaction
exports.updateTransaction = async (req, res) => {
  const {
    TransactionCode,
    ClientCode,
    CompanyCode,
    SchemeCode,
    TransactionDate,
    Amount,
    CreditDebit,
    TransactionType,
    IsReturnComplete,
    Remarks
  } = req.body;

  try {
    const [result] = await db.query(
      'CALL sp_InsertOrUpdate_InvestmentTransaction(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [TransactionCode, ClientCode, CompanyCode, SchemeCode, TransactionDate, Amount, CreditDebit, TransactionType, IsReturnComplete, Remarks]
    );
    res.json({ message: 'Transaction updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Update failed' });
  }
};

// DELETE transaction
exports.deleteTransaction = async (req, res) => {
  const { code } = req.params;
  try {
    const [result] = await db.query('CALL sp_Delete_InvestmentTransaction(?)', [code]);
    res.json({ message: 'Transaction deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Deletion failed' });
  }
};
