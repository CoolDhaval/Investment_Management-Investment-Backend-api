const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

router.post('/companies', companyController.createCompany);
router.put('/companies', companyController.createCompany);
router.delete('/companies/:CompanyCode', companyController.deleteCompany);
router.get('/companies', companyController.getAllCompanies);


/*
//router.post('/', companyController.createOrUpdateCompany);

router.post('/companies', (req, res) => {
    console.log("✅ POST /companies called");  // <-- Debug log
  
    // Call your existing controller logic
    companyController.createOrUpdateCompany(req, res);
  });
//router.get('/companies', companyController.getAllCompanies);

router.get('/companies', (req, res) => {
    console.log("✅ GET /companies called");  // <-- Debug log
  
    // Call your existing controller logic
    companyController.getAllCompanies(req, res);
  });
*/
module.exports = router;
