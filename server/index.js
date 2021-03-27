const express = require('express');
const request = require('request');
const cors = require('cors');
const app = express();

app.get('/', cors(), async function(req, res) {
    request('http://www.mrsoft.by/data.json', function (error, response, body) {
        if (error) {
            throw new Error()
        } else {
            res.send(body);
        }
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running in port: 3000');
})