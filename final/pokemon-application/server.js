const express = require('express');
const path = require('path');

const app = express();
const port = 8888;

// require in out database functionality
const mongo = require('./db');

app.use('/', express.static(path.join(__dirname, './client')));

// require in the exported router from search.js
const search = require('./routes/search.js');
app.use('/search', search);

// start the server
app.listen(port, async () => {
    console.log(`Server is listening on port ${port}`);
    // await mongo.connect();
});