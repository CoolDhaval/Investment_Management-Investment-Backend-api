const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/clierntReturnMatrix/:clientCode', async (req, res) => {
    const clientCode = req.params.clientCode;

    console.log('clierntReturnMatrix');
    console.log(clientCode);
  
    try {
     
      const [rows] = await db.query(`CALL GetClientCompanyReturnMatrix(?)`, [clientCode]);
   
  
      // Stored procedure returns an array of arrays, we want the first result set
      res.json(rows[0]);
    } catch (err) {
      console.error('Error fetching report:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  module.exports = router;
