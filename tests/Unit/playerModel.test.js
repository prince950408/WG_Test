const { initPlayerData, getPlayerData, updatePlayerBalance } = require('../../models/player');

describe('playerModel functions', () => {
    initPlayerData(1000, 0, 0);
    
    it('should load player data correctly', () => {
        const playerData = getPlayerData();
        expect(playerData.balance).toBe(1000);
        expect(playerData.totalBets).toBe(0);
        expect(playerData.totalWinnings).toBe(0);
    });

    it('should update player balance correctly', () => {
        updatePlayerBalance(50);
        let playerData = getPlayerData();
        expect(playerData.balance).toBe(1050);

        updatePlayerBalance(-100);
        playerData = getPlayerData();
        expect(playerData.balance).toBe(950);
    });
});
