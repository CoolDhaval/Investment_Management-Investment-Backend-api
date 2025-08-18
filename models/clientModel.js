const db = require('../config/db');

exports.insertOrUpdateClient = async (
  ClientCode,
  ClientName,
  ContactNo,
  PANNo,
  AadharNo,
  DepositBankName,
  DepositBankAccountNo,
  DepositBankIFSCCode,
  WithdrawalBankName,
  WithdrawalBankAccountNo,
  WithdrawalBankIFSCCode
) => {
  return db.execute(
    'CALL sp_InsertOrUpdate_ClientMaster(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      ClientCode,
      ClientName,
      ContactNo,
      PANNo,
      AadharNo,
      DepositBankName,
      DepositBankAccountNo,
      DepositBankIFSCCode,
      WithdrawalBankName,
      WithdrawalBankAccountNo,
      WithdrawalBankIFSCCode
    ]
  );
};
