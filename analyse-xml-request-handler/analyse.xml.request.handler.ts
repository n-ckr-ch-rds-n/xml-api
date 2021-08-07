import got from "got";
import {Parser} from "node-expat";
import {XmlAnalyser} from "../xml-analyser/xml.analyser";
import {waitFor, waitForFirst} from "wait-for-event";
import {XmlAnalysis} from "../xml-analyser/xml.analysis";

export class AnalyseXmlRequestHandler {

    private nodes: any[] = [];

    constructor(private parser: Parser, private analyser: XmlAnalyser) {
    }

    async handle(url: string): Promise<XmlAnalysis> {
        this.parser.on("startElement", (name, attrs) => this.nodes.push(attrs));
        const xmlStream = got.stream(url);
        xmlStream.on("error", () => xmlStream.emit("close"));
        const parsedXmlStream = xmlStream.pipe(this.parser);
        await waitForFirst("close", [xmlStream, parsedXmlStream]);
        const analysis = this.analyser.toXmlAnalysis(this.nodes);
        this.nodes = [];
        this.parser.reset();
        return analysis;
    }
}
