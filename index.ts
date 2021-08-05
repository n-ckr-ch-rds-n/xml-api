import express from "express";

const app = express();

app.get("/", async (req, res) => {
    res.send("Hello");
})

const port = process.env.port || 3000;

app.listen(port, () => console.log(`App listening on port ${port}`));
