const { getPlayerData, updatePlayerBalance, updateTotalBets, updateTotalWinnings } = require('../models/player');
const { generateMatrix, calculateWinnings } = require('../utils/game');

const playGame = (req, res) => {
    const { bet } = req.body;
    const playerData = getPlayerData();

    if (!bet || bet <= 0 || bet > playerData.balance) {
        return res.status(400).send('Invalid bet amount');
    }

    updatePlayerBalance(-bet);
    updateTotalBets(bet);

    const matrix = generateMatrix();
    const winnings = calculateWinnings(matrix) * bet;

    updatePlayerBalance(winnings);
    updateTotalWinnings(winnings);

    res.json({ matrix, winnings });
};

const simulateGames = (req, res) => {
    const { count, bet } = req.body;
    const playerData = getPlayerData();

    if (!count || count <= 0 || !bet || bet <= 0 || (bet * count) > playerData.balance) {
        return res.status(400).send('Invalid count or bet amount');
    }

    updatePlayerBalance(-(bet * count));
    updateTotalBets(bet * count);

    let totalWinnings = 0;

    for (let i = 0; i < count; i++) {
        const matrix = generateMatrix();
        totalWinnings += calculateWinnings(matrix) * bet;
    }

    updatePlayerBalance(totalWinnings);
    updateTotalWinnings(totalWinnings);

    res.json({ totalWinnings, netResult: totalWinnings - (bet * count) });
};

const getRTP = (req, res) => {
    const playerData = getPlayerData();

    // For first spin, return 0
    if (playerData.totalBets == 0) {
        res.json({ "rtp": 0 });
    }

    const rtp = (playerData.totalWinnings / playerData.totalBets) * 100;
    res.json({ rtp });
};

module.exports = {
    playGame,
    simulateGames,
    getRTP
};
