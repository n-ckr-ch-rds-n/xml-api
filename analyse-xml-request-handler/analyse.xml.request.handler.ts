import got from "got";
import {Parser} from "node-expat";
import EventEmitter from "events";
import {XmlAnalyser} from "../xml-analyser/xml.analyser";

export class AnalyseXmlRequestHandler {

    public analysisEmitter = new EventEmitter();

    private nodes: any[] = [];

    constructor(private analyser: XmlAnalyser) {}

    handle(url: string) {
        const parser = this.createParser();
        const parsedXmlStream = got.stream(url).pipe(parser);
        parsedXmlStream.on("close",
            () => this.analysisEmitter.emit("analysisComplete", this.analyser.toXmlAnalysis(this.nodes)))
    }

    private createParser(): Parser {
        return new Parser("UTF-8")
            .on("startElement", (name, attrs) => this.nodes.push(attrs))
    }
}

const analyser = new AnalyseXmlRequestHandler(new XmlAnalyser());
analyser.analysisEmitter.on("analysisComplete", (data) => console.log("Analysis complete", data));
analyser.handle("https://merapar-assessment-task.s3.eu-central-1.amazonaws.com/3dprinting-posts.xml");
