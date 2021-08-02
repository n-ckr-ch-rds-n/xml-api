import got from "got";
import expat from "node-expat";

const pipeXMLToParser = () => {
    const parser = new expat.Parser("UTF-8");
    parser.on("text", (name, attrs) => {
        console.log(name, attrs);
    })
    got.stream("https://merapar-assessment-task.s3.eu-central-1.amazonaws.com/arabic-posts.xml")
        .pipe(parser);
}

pipeXMLToParser();
