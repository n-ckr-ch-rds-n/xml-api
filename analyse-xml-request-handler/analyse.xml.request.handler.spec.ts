import mockserver from "mockserver-node";
import {AnalyseXmlRequestHandler} from "./analyse.xml.request.handler";
import {Parser} from "node-expat";
import {XmlAnalyser} from "../xml-analyser/xml.analyser";


describe("Analyse XML request handler", () => {
    let handler: AnalyseXmlRequestHandler;

    beforeAll(() => {
        mockserver.start_mockserver({
            serverPort: 1080,
            trace: true
        })
    })

    beforeEach(() => {
        const handler = new AnalyseXmlRequestHandler(new Parser("UTF-8"), new XmlAnalyser());
    })

    afterAll(() => {
        mockserver.stop_mockserver({
            serverPort: 1080
        })
    })

})
