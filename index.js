const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

app.get("/root", async (req, res) => {
    let delay = parseInt(req.query.delay) || 0; 
    let resolveUrl = req.query.resolveUrl;

    try {
        setTimeout(async () => {
            res.send(resolveUrl)
        }, delay);
    } catch (err) {
        res.status(500).send({ error: "Unexpected error occurred.", details: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
