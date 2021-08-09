import express from "express";
import {AnalyseXmlRequestHandler} from "./analyse-xml-request-handler/analyse.xml.request.handler";
import {XmlAnalyser} from "./xml-analyser/xml.analyser";
import {Parser} from "node-expat";
import validator from "valid-url";

const app = express();
app.use(express.json());
const handler = new AnalyseXmlRequestHandler(new Parser("UTF-8"), new XmlAnalyser());

app.post("/analyse", async (req, res) => {
    if (req.body.url && validator.isUri(req.body.url)) {
        try {
            const analysis = await handler.handle(req.body.url);
            res.json(analysis);
        } catch (e) {
            res.status(500).json(e);
        }
    } else {
        const error = new Error("Bad request: body must contain a valid URL");
        res.status(400).json(error);
    }
})

const port = process.env.port || 3000;

app.listen(port, () => console.log(`App listening on port ${port}`));
