const express = require('express');
const router = express.Router();
const clientCompanycontroller = require('../controllers/clientCompanyController');

router.post('/clientcompany', clientCompanycontroller.linkClientToCompany);
router.put('/clientcompany', clientCompanycontroller.updateLink);
router.delete('/clientcompany/:companyCode/:clientCode', clientCompanycontroller.deleteLink);
router.get('/clientcompany', clientCompanycontroller.getAllLinks);
router.get('/clientcompany/:companyCode/:clientCode', clientCompanycontroller.getLink);

module.exports = router;
