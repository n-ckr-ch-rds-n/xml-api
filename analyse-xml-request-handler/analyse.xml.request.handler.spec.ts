import {AnalyseXmlRequestHandler} from "./analyse.xml.request.handler";
import {Parser} from "node-expat";
import {XmlAnalyser} from "../xml-analyser/xml.analyser";
import {AnalysisDetails} from "../xml-analyser/analysis.details";
import {mockServerConfig} from "./mock.server.config";
import {AnalysisFailed} from "../xml-analyser/analysis.failed";
import {app} from "./mock.server";
import {Server} from "http";

describe("Analyse XML request handler", () => {
    let handler: AnalyseXmlRequestHandler;
    let server: Server;
    const {port, validPostDataPath, invalidPostDataPath} = mockServerConfig;

    beforeAll(() => {
        server = app.listen(port, () => console.log(`Mock server listening on port ${port}`));
    })

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

    afterAll(() => {
        server.close();
    })

})
