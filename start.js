require('dotenv').config();

const app = require('./server');

const PORT = process.env.SERVER_PORT || 6000;

app.listen(PORT, () => {
    console.log(`Your port listen on http://localhost:${PORT}`);
})