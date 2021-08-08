import {AnalyseXmlRequestHandler} from "./analyse.xml.request.handler";
import {Parser} from "node-expat";
import {XmlAnalyser} from "../xml-analyser/xml.analyser";
import {AnalysisDetails} from "../xml-analyser/analysis.details";
import {mockServerConfig} from "./mock.server.config";
import {AnalysisFailed} from "../xml-analyser/analysis.failed";

describe("Analyse XML request handler", () => {
    let handler: AnalyseXmlRequestHandler;
    const {port, validPostDataPath, invalidPostDataPath} = mockServerConfig;

    beforeEach(() => {
        handler = new AnalyseXmlRequestHandler(new Parser("UTF-8"), new XmlAnalyser());
    })

    it("Analyses post data xml docs", async () => {
        const analysis = await handler.handle(`http://localhost:${port}/${validPostDataPath}`);
        expect(!!(analysis.details as AnalysisDetails).firstPost).toBe(true);
    })

    it("Returns an empty analysis if XML does not contain post data", async () => {
        const analysis = await handler.handle(`http://localhost:${port}/${invalidPostDataPath}`);
        expect(analysis.details).toBe(AnalysisFailed.NoData);
    })

})
