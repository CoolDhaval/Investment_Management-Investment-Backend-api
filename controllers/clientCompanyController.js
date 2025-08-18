const db = require('../config/db');
exports.linkClientToCompany = async (req, res) => {

    console.log('called linkClientToCompany');
    console.log(req.body);
    const { CompanyCode, ClientCode, InvestmentAmount } = req.body;
  
    try {
     await db.query('CALL sp_Insert_ClientCompanyInvestment(?, ?, ?)', [
        CompanyCode,
        ClientCode,
        InvestmentAmount
      ]);
      res.json({ message: 'Client linked to Company successfully' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.sqlMessage || 'Failed to link' });
    }
  };
  exports.deleteLink = async (req, res) => {
      console.log('called deleteLink');
      console.log(req.params);
    const { companyCode, clientCode } = req.params;
    try {
      await db.query('CALL sp_Delete_ClientCompanyInvestment(?, ?)', [companyCode, clientCode]);
      res.json({ message: 'Link deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.sqlMessage || 'Delete failed' });
    }
  };
  exports.updateLink = async (req, res) => {
    const { CompanyCode, ClientCode, InvestmentAmount } = req.body;
    try {
      await db.query('CALL sp_Update_ClientCompanyInvestment(?, ?, ?)', [CompanyCode, ClientCode, InvestmentAmount]);
      res.json({ message: 'Link updated successfully' });
    } catch (error) {
      res.status(400).json({ error: error.sqlMessage || 'Update failed' });
    }
  };
  exports.getAllLinks = async (req, res) => {
    try {
      const [rows] = await db.query('CALL sp_GetAll_ClientCompanyInvestments()');
      res.json(rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch links' });
    }
  };
  exports.getLink = async (req, res) => {
    const { companyCode, clientCode } = req.params;
    try {
      const [rows] = await db.query('CALL sp_Get_ClientCompanyInvestment(?, ?)', [companyCode, clientCode]);
      res.json(rows[0][0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch link' });
    }
  };
  