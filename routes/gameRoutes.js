const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/play', gameController.playGame);
router.post('/sim', gameController.simulateGames);
router.get('/rtp', gameController.getRTP);

module.exports = router;