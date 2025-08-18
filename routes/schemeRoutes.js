const express = require('express');
const router = express.Router();
const schemeController = require('../controllers/schemeController');

router.post('/schemes', schemeController.createOrUpdateScheme);
router.get('/schemes', schemeController.getAllSchemes);

module.exports = router;
