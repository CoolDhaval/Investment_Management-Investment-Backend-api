const clientModel = require('../models/clientModel');
const db = require('../config/db');

exports.createOrUpdateClient = async (req, res) => {
  try {
    const {
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
    } = req.body;

    // Validate required fields
    if (!ClientCode || !ClientName || !ContactNo) {
      return res.status(400).json({ error: 'ClientCode, ClientName and ContactNo are required' });
    }

    const [result] = await clientModel.insertOrUpdateClient(
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
    );

    res.status(201).json({
      message: 'Client saved successfully',
      data: result
    });
  } catch (error) {
    console.error('Error Saving Client:', error);
    res.status(500).json({ error: 'Error saving client' });
  }
};
// GET Endpoints in controllers/clientController.js
exports.getAllClients = async (req, res) => {
    try {
      const [rows] = await db.query('CALL sp_GetAll_ClientMaster()');
      res.json(rows[0]);
    } catch (error) {
      console.error('Error fetching clients:', error);
      res.status(500).json({ error: 'Failed to fetch clients' });
    }
  };


  // UPDATE transaction
exports.UpdateClient = async (req, res) => {
  const {
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
  } = req.body;

  try {
    const [result] = await db.query(
      'CALL sp_InsertOrUpdate_ClientMaster(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [ClientCode,ClientName,ContactNo,PANNo,AadharNo,DepositBankName,DepositBankAccountNo,DepositBankIFSCCode,
        WithdrawalBankName,
        WithdrawalBankAccountNo,
        WithdrawalBankIFSCCode]
    );
    res.json({ message: 'Transaction updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Update failed' });
  }
};

  // DELETE transaction
exports.deleteClient = async (req, res) => {
  const { ClientCode } = req.params;
  try {
    await db.query('CALL sp_Delete_Client(?)', [ClientCode]);
    res.json({ message: 'Client deleted successfully' });
  } catch (err) {
    console.error('Error deleting client:', err);
    res.status(500).json({ error: 'Deletion failed' });
  }
};
