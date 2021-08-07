import express from "express";
import {AnalyseXmlRequestHandler} from "./analyse-xml-request-handler/analyse.xml.request.handler";
import {XmlAnalyser} from "./xml-analyser/xml.analyser";
import {waitFor} from "wait-for-event";

const app = express();
app.use(express.json());
const analyser = new XmlAnalyser();
const handler = new AnalyseXmlRequestHandler(analyser);

app.get("/", async (req, res) => {
    res.send("Hello old bean");
})

app.post("/analyse", async (req, res) => {
    handler.analysisEmitter.on("analysisComplete", (analysis) => res.json(analysis));
    handler.handle(req.body.url);
    await waitFor("analysisComplete", handler.analysisEmitter)
    // res.send("BEEP");
})

const port = process.env.port || 3000;

app.listen(port, () => console.log(`App listening on port ${port}`));
