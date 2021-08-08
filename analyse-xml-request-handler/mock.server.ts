import express from "express";
import fs from "fs";
import path from "path";

const app = express();

app.get("/foo", async (req, res) => {
    res.set("Content-Type", "text/xml");
    const xml = fs.readFileSync(path.join(__dirname, "test.data.xml"));
    res.send(xml);
})

app.listen(3000, () => console.log("Mock server listening on port 3000"));
