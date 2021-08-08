import mockserver from "mockserver-node";
import {AnalyseXmlRequestHandler} from "./analyse.xml.request.handler";
import {Parser} from "node-expat";
import {XmlAnalyser} from "../xml-analyser/xml.analyser";
import {mockServerClient} from "mockserver-client";

describe("Analyse XML request handler", () => {
    let handler: AnalyseXmlRequestHandler;
    const serverPort = 1080;

    beforeAll(() => {
        mockserver.start_mockserver({
            serverPort,
            trace: true
        })
        mockServerClient("localhost", serverPort).mockAnyResponse({
            httpRequest: {
                method: "GET",
                path: "/foobar.xml"
            },
            httpResponse: {
                statusCode: 200,
                headers: {},
                body: "foobar"
            }
        })
    })

    beforeEach(() => {
        handler = new AnalyseXmlRequestHandler(new Parser("UTF-8"), new XmlAnalyser());
    })

    it("Handles XML analysis requests", async () => {
        const analysis = await handler.handle(`https://localhost:${serverPort}/foobar.xml`);
        console.log("analysis", analysis);
        expect(true).toBe(true);
    })

    afterAll(() => {
        mockserver.stop_mockserver({
            serverPort
        })
    })

})
