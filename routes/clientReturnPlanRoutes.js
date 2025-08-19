const express = require('express');
const router = express.Router();
const db = require('../config/db');


// ✅ GET return plans by ClientCode + CompanyCode (path params)
router.get('/client-return-plan/:clientCode/:companyCode', async (req, res) => {
    const { clientCode, companyCode } = req.params;
  
    try {
      const [rows] = await db.query(
        `SELECT * FROM ClientReturnPlan WHERE ClientCode = ? AND CompanyCode = ?`,
        [clientCode, companyCode]
      );
      
      if (rows.length === 0) {
        return res.status(404).json({ message: 'No return plan found' });
      }
      
      res.json(rows);
    } catch (err) {
      console.error('Error fetching return plans:', err);
      res.status(500).json({ error: 'Database error' });
    }
  });
  
// ✅ GET all return plans (optional filter by clientCode or companyCode)
router.get('/client-return-plan', async (req, res) => {
  const { clientCode, companyCode } = req.query;
  console.log(clientCode);
  console.log(companyCode);
  let sql = `SELECT B.CompanyName,C.ClientName,A.* FROM ClientReturnPlan A,CompanyMaster B,ClientMaster C WHERE A.CompanyCode=B.CompanyCode And A.ClientCode = C.ClientCode`;
  const params = [];

  if (clientCode) {
    sql += ` AND ClientCode = ?`;
    params.push(clientCode);
  }
  if (companyCode) {
    sql += ` AND CompanyCode = ?`;
    params.push(companyCode);
  }

  try {
      console.log(sql);
    const [rows] = await db.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching return plans:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// ✅ Update a Return Plan entry by ReturnId
router.put('/client-return-plan/:ReturnId', async (req, res) => {
  const { ReturnId } = req.params;
  const { Received, ReceiveDate, transactionNo, receiveRemrks } = req.body;

  if (!ReturnId) {
    return res.status(400).json({ error: 'ReturnId is required' });
  }
console.log(ReturnId);
console.log(ReceiveDate);
console.log(transactionNo);
console.log(receiveRemrks);
console.log(Received);

  try {
    const [result] = await db.query(
      `UPDATE ClientReturnPlan
       SET Received = ?, 
           ReceiveDate = ?, 
           transactionNo = ?, 
           receiveRemrks = ?
       WHERE ReturnId = ?`,
      [Received, ReceiveDate, transactionNo, receiveRemrks, ReturnId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'ReturnId not found' });
    }

    res.json({ message: 'Return plan updated successfully' });
  } catch (err) {
    console.error('Error updating return plan:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
