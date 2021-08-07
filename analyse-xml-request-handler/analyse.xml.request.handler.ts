import got from "got";
import {Parser} from "node-expat";
import {XmlAnalyser} from "../xml-analyser/xml.analyser";
import {waitFor} from "wait-for-event";
import {XmlAnalysis} from "../xml-analyser/xml.analysis";

export class AnalyseXmlRequestHandler {

    private nodes: any[] = [];

    constructor(private parser: Parser, private analyser: XmlAnalyser) {
    }

    async handle(url: string): Promise<XmlAnalysis> {
        this.parser.on("startElement", (name, attrs) => this.nodes.push(attrs));
        const parsedXmlStream = got.stream(url).pipe(this.parser);
        await waitFor("close", parsedXmlStream);
        const analysis = this.analyser.toXmlAnalysis(this.nodes);
        this.nodes = [];
        this.parser.reset();
        return analysis;
    }
}
