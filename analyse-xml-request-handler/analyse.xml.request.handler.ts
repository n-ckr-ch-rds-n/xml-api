import got from "got";
import {Parser} from "node-expat";
import {XmlAnalyser} from "../xml-analyser/xml.analyser";
import {waitForFirst} from "wait-for-event";
import {XmlAnalysis} from "../xml-analyser/xml.analysis";
import {Readable} from "stream";

export class AnalyseXmlRequestHandler {

    private nodes: any[] = [];

    constructor(private parser: Parser, private analyser: XmlAnalyser) {
    }

    async handle(url: string): Promise<XmlAnalysis> {
        this.parser.on("startElement", (name, attrs) => this.nodes.push(attrs));
        const xmlStream = got.stream(url);
        const parsedXmlStream = xmlStream.pipe(this.parser);
        for (const stream of [xmlStream, parsedXmlStream]) {
            stream.on("error", (e) => this.handleError(e, stream as Readable));
        }
        await waitForFirst("close", [xmlStream, parsedXmlStream]);
        const analysis = this.analyser.toXmlAnalysis(this.nodes);
        this.cleanup();
        return analysis;
    }

    private cleanup(): void {
        this.nodes = [];
        this.parser.reset();
    }

    private handleError(error: Error, stream: Readable): void {
        console.error(error);
        stream.emit("close");
    }
}
