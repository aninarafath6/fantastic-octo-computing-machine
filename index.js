const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

app.get("/root", async (req, res) => {
    let delay = parseInt(req.query.delay) || 0; 
    let resolveUrl = req.query.resolveUrl;

    if (!resolveUrl) {
        return res.status(400).send({ error: "resolveUrl query parameter is missing." });
    }

    try {
        setTimeout(async () => {
            try {
                const response = await axios({
                    method: "get",
                    url: resolveUrl,
                    responseType: "arraybuffer"
                });

                const contentType = response.headers["content-type"];
                res.setHeader("Content-Type", contentType);

                res.send(response.data);
            } catch (err) {
                res.status(500).send({ error: "Error downloading the image.", details: err.message });
            }
        }, delay);

    } catch (err) {
        res.status(500).send({ error: "Unexpected error occurred.", details: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
