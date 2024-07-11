const express = require('express');
const bodyParser = require('body-parser');
const gameRoutes = require('./routes/gameRoutes');
const walletRoutes = require('./routes/walletRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/', gameRoutes);
app.use('/wallet', walletRoutes);

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app
