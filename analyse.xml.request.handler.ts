import got from "got";
import expat, {Parser} from "node-expat";
import EventEmitter from "events";

export class AnalyseXmlRequestHandler {

    public analysisEmitter = new EventEmitter();

    private nodes: any[] = [];

    constructor() {}

    handle(url: string) {
        const parser = this.createParser();
        const parsedXmlStream = got.stream(url).pipe(parser);
        parsedXmlStream.on("close", () => this.analysisEmitter.emit("analysisComplete", this.nodes))
    }

    private createParser(): Parser {
        return new expat.Parser("UTF-8")
            .on("startElement", (name, attrs) => this.nodes.push(attrs))
    }
}

const analyser = new AnalyseXmlRequestHandler();
analyser.analysisEmitter.on("analysisComplete", (data) => console.log("Analysis complete", data));
analyser.handle("https://merapar-assessment-task.s3.eu-central-1.amazonaws.com/arabic-posts.xml");
