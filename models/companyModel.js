const db = require('../config/db');

exports.insertOrUpdateCompany = async (
  CompanyCode,
  CompanyName,
  ContactNo1,
  ContactNo2,
  EmailId,
  BankName,
  BankAccountNo,
  BankIFSC,
  DateOfInvestment,
  TenureMonths,
  MaturityDate,
  InterestRate,
  InterestFrequency,
  InterestMonths,
  PaymentDay,
  PrincipalRepayment
  
) => {
  return await db.execute(
    `CALL sp_InsertOrUpdate_CompanyMaster(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      CompanyCode ?? null,
      CompanyName ?? null,
      ContactNo1 ?? null,
      ContactNo2 ?? null,
      EmailId ?? null,
      BankName ?? null,
      BankAccountNo ?? null,
      BankIFSC ?? null,
      DateOfInvestment?? null,
      TenureMonths?? null,
      MaturityDate?? null,
      InterestRate?? null,
      InterestFrequency?? null,
      InterestMonths?? null,
      PaymentDay?? null,
      PrincipalRepayment?? null  
    ]
  );
};
