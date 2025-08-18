const companyModel = require('../models/companyModel');
const db = require('../config/db');

exports.createCompany = async (req, res) => {

  console.log("✅createCompany");  // <-- Debug log
  try {
    let {
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
    } = req.body;

    // Prevent undefined → convert to null
    CompanyCode = CompanyCode ?? null;
    CompanyName = CompanyName ?? null;
    ContactNo1 = ContactNo1 ?? null;
    ContactNo2 = ContactNo2 ?? null;
    EmailId = EmailId ?? null;
    BankName = BankName ?? null;
    BankAccountNo = BankAccountNo ?? null;
    BankIFSC = BankIFSC ?? null;
    DateOfInvestment = DateOfInvestment?? null,
    TenureMonths=TenureMonths?? null,
    MaturityDate=MaturityDate?? null,
    InterestRate=InterestRate?? null,
    InterestFrequency=InterestFrequency?? null,
    InterestMonths=InterestMonths?? null,
    PaymentDay=PaymentDay?? null,
    PrincipalRepayment=PrincipalRepayment?? null  

    const result = await companyModel.insertOrUpdateCompany(
      CompanyCode,
      CompanyName,
      ContactNo1,
      ContactNo2,
      EmailId,
      BankName,
      BankAccountNo,
      BankIFSC  ,
      DateOfInvestment,
      TenureMonths,
      MaturityDate,
      InterestRate,
      InterestFrequency,
      InterestMonths,
      PaymentDay,
      PrincipalRepayment
    );

    res.status(201).json({ message: 'Company saved successfully', data: result });
  } catch (error) {
    console.error('Error Saving Company:', error);
    res.status(500).json({ error: error.message });
  }
};
// GET Endpoints in controllers/companyController.js

exports.getAllCompanies = async (req, res) => {
  console.log("✅called getAllCompanies");  // <-- Debug log
  try {
    const [rows] = await db.query('CALL sp_GetAll_CompanyMaster()');
    res.json(rows[0]);
    console.log('Fetched companies from DB:');  // <--- Add this
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
};

// DELETE transaction
exports.deleteCompany = async (req, res) => {
  console.log("✅called Deletecompany");  // <-- Debug log
  const { CompanyCode  } = req.params;
  console.log(req.params);  // <-- Debug log
  try {
    const [result] = await db.query('CALL sp_Delete_Company(?)', [CompanyCode ]);
    res.json({ message: 'Company deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Deletion failed' });
  }
};


exports.updateCompany = async (req, res) => {
  console.log("✅called updatecompany");  // <-- Debug log
  const {
    CompanyCode,CompanyName,ContactNo1,ContactNo2,EmailId,BankName, BankAccountNo, BankIFSC,DateOfInvestment,
    TenureMonths,
    MaturityDate,
    InterestRate,
    InterestFrequency,
    InterestMonths,
    PaymentDay,
    PrincipalRepayment
  } = req.body;

  try {
    const [result] = await db.query(
      'sp_InsertOrUpdate_CompanyMaster(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [CompanyCode,CompanyName,ContactNo1 ,ContactNo2 ,EmailId,BankName ,BankAccountNo,BankIFSC,DateOfInvestment,
        TenureMonths,
        MaturityDate,
        InterestRate,
        InterestFrequency,
        InterestMonths,
        PaymentDay,
        PrincipalRepayment ]
    );
    res.json({ message: 'Company updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Update failed' });
  }
};
