let playerData = {
    balance: 1000,
    totalBets: 0,
    totalWinnings: 0
};

const initPlayerData = (balance, totalBets, totalWinnings) => {
    playerData.balance = balance;
    playerData.totalBets = totalBets;
    playerData.totalWinnings = totalWinnings;
};

const getPlayerData = () => {
    return playerData;
};

const updatePlayerBalance = (amount) => {
    playerData.balance += amount;
};

const updateTotalBets = (amount) => {
    playerData.totalBets += amount;
};

const updateTotalWinnings = (amount) => {
    playerData.totalWinnings += amount;
};

module.exports = {
    initPlayerData,
    getPlayerData,
    updatePlayerBalance,
    updateTotalBets,
    updateTotalWinnings,
};
