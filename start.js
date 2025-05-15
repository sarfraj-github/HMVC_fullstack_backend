require('dotenv').config();

const app = require('./server');

app.get('/', (req, res) => {
    console.log("Backend Setuped");
    res.send("Running suuccess!")
})

app.listen(process.env.PORT, () => {
    console.log(`Your port listen on http://localhost:${process.env.PORT}`);
})