const { getPlayerData, updatePlayerBalance } = require('../models/player');

const deposit = (req, res) => {
	const { amount } = req.body;
	if (!amount || amount <= 0) {
		return res.status(400).send('Invalid deposit amount');
	}

	updatePlayerBalance(amount);

	res.json({ balance: getPlayerData().balance });
};

const withdraw = (req, res) => {
	const { amount } = req.body;
	const playerData = getPlayerData();

	if (!amount || amount <= 0 || amount > playerData.balance) {
		return res.status(400).send('Invalid withdraw amount');
	}

	updatePlayerBalance(-amount);

	res.json({ balance: getPlayerData().balance });
};

const getBalance = (req, res) => {
	res.json({ balance: getPlayerData().balance });
};

module.exports = {
	deposit,
	withdraw,
	getBalance
};
