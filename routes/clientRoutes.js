const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.post('/clients', clientController.createOrUpdateClient);
router.put('/clients', clientController.createOrUpdateClient);
router.delete('/clients/:ClientCode', clientController.deleteClient);
router.get('/clients', clientController.getAllClients);

module.exports = router;
