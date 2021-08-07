import express from "express";
import {AnalyseXmlRequestHandler} from "./analyse-xml-request-handler/analyse.xml.request.handler";
import {XmlAnalyser} from "./xml-analyser/xml.analyser";
import {Parser} from "node-expat";

const app = express();
app.use(express.json());
const handler = new AnalyseXmlRequestHandler(new Parser("UTF-8"), new XmlAnalyser());

app.post("/analyse", async (req, res) => {
    const analysis = await handler.handle(req.body.url);
    res.json(analysis);
})

const port = process.env.port || 3000;

app.listen(port, () => console.log(`App listening on port ${port}`));
