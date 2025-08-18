// models/transactionModel.js
const db = require('../config/db');

exports.insertOrUpdateTransaction = async (
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
) => {
  return db.execute(
    'CALL sp_InsertOrUpdate_InvestmentTransaction(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
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
    ]
  );
};
