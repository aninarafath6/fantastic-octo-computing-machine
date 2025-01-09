const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

app.get("/root", async (req, res) => {
    let delay = parseInt(req.query.delay) || 0; 
    let resolveUrl = req.query.resolveUrl;

    if(!delay){
        return res.status(400).send("Missing delay query parameter.");
    }
    if (!resolveUrl) {
        return res.status(400).send("Missing resolveUrl query parameter.");
    }


    try {
        setTimeout(async () => {
            try {
                const response = await axios.get(resolveUrl);
                res.send(response.data);
            } catch (error) {
                res.status(500).send({ error: "Failed to fetch resolveUrl.", details: error.message });
            }
        }, delay);
    } catch (err) {
        res.status(500).send({ error: "Unexpected error occurred.", details: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
