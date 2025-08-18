const schemeModel = require('../models/schemeModel');
const db = require('../config/db');

exports.createOrUpdateScheme = async (req, res) => {
  try {
    const {
      SchemeCode,
      SchemeName,
      Remarks,
      InterestType,
      InterestPercent
    } = req.body;

    // Basic validation
    if (!SchemeCode || !SchemeName) {
      return res.status(400).json({ error: 'SchemeCode and SchemeName are required' });
    }

    const [result] = await schemeModel.insertOrUpdateScheme(
      SchemeCode,
      SchemeName,
      Remarks,
      InterestType,
      InterestPercent
    );

    res.status(201).json({
      message: 'Scheme saved successfully',
      data: result
    });
  } catch (error) {
    console.error('Error Saving Scheme:', error);
    res.status(500).json({ error: 'Error saving scheme' });
  }
};
// GET Endpoints in controllers/schemeController.js
exports.getAllSchemes = async (req, res) => {
    try {
      const [rows] = await db.query('CALL sp_GetAll_SchemeMaster()');
      res.json(rows[0]);
    } catch (error) {
      console.error('Error fetching schemes:', error);
      res.status(500).json({ error: 'Failed to fetch schemes' });
    }
  };