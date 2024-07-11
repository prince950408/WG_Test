const request = require('supertest');
const app = require('../../index');
const { initPlayerData } = require('../../models/player');

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
});

describe('POST /play', () => {
    it('should execute a single play and return matrix, winnings', async () => {
        initPlayerData(1000, 0, 0);
        const response = await request(app)
            .post('/play')
            .send({ bet: 100 });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('matrix');
        expect(response.body).toHaveProperty('winnings');
    });

    it('should return 400 for invalid bet amount', async () => {
        initPlayerData(1000, 0, 0);
        const response = await request(app)
            .post('/play')
            .send({ bet: -10 });

        expect(response.status).toBe(400);
    });
});

describe('POST /sim', () => {
    it('should simulate spins and return totalWinnings, netResult, and RTP', async () => {
        initPlayerData(1000, 0, 0);
        const response = await request(app)
            .post('/sim')
            .send({ count: 5, bet: 10 });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('totalWinnings');
        expect(response.body).toHaveProperty('netResult');
    });

    it('should return 400 for invalid count or bet amount', async () => {
        initPlayerData(1000, 0, 0);
        const response = await request(app)
            .post('/sim')
            .send({ count: -5, bet: 10 });

        expect(response.status).toBe(400);
    });
});

describe('GET /rtp', () => {
    it('should return the correct RTP percentage', async () => {
        initPlayerData(1000, 100, 100);
        const response = await request(app)
            .get('/rtp');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('rtp');
        expect(response.body.rtp).toBe(100);
    });

    it('should return the 0 for the first spin', async () => {
        initPlayerData(1000, 0, 0);
        const response = await request(app)
            .get('/rtp');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('rtp');
        expect(response.body.rtp).toBe(0);
    });
});


describe('POST /wallet/deposit', () => {
    it('should deposit funds into the player wallet', async () => {
        initPlayerData(1000, 0, 0);
        const response = await request(app)
            .post('/wallet/deposit')
            .send({ amount: 100 });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('balance');
        expect(response.body.balance).toBe(1100);
    });

    it('should return 400 for invalid deposit amount', async () => {
        initPlayerData(1000, 0, 0);
        const response = await request(app)
            .post('/wallet/deposit')
            .send({ amount: -100 });

        expect(response.status).toBe(400);
    });
});

describe('POST /wallet/withdraw', () => {
    it('should withdraw funds from the player wallet', async () => {
        initPlayerData(1000, 0, 0);
        const response = await request(app)
            .post('/wallet/withdraw')
            .send({ amount: 50 });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('balance');
        expect(response.body.balance).toBe(950);
    });

    it('should return 400 for invalid withdraw amount', async () => {
        initPlayerData(1000, 0, 0);
        const response = await request(app)
            .post('/wallet/withdraw')
            .send({ amount: 2000 });

        expect(response.status).toBe(400);
    });
});

describe('GET /wallet/balance', () => {
    it('should return the current balance', async () => {
        initPlayerData(1000, 0, 0);
        const response = await request(app)
            .get('/wallet/balance');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('balance');
        expect(response.body.balance).toBe(1000);
    });
});
