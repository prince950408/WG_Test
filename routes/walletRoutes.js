const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');

router.post('/deposit', walletController.deposit);
router.post('/withdraw', walletController.withdraw);
router.get('/balance', walletController.getBalance);

module.exports = router;