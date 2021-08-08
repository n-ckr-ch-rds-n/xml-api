import {XmlAnalyser} from "./xml.analyser";
import {PostData} from "./post.data";
import {AnalysisDetails} from "./analysis.details";
import {XmlAnalysis} from "./xml.analysis";
import {AnalysisFailed} from "./analysis.failed";

describe("XML Analyser", () => {
    let analyser: XmlAnalyser;
    let postData: PostData[];
    let analysis: XmlAnalysis;
    let details: AnalysisDetails;

    beforeEach(() => {
        postData = [
            {
                Id: "foo",
                AcceptedAnswerId: "bar",
                PostTypeId: "baz",
                ParentId: "foo",
                CreationDate: "bar",
                Score: "3",
                Body: "baz",
                OwnerUserId: "foobar",
                LastActivityDate: "barbaz",
                CommentCount: "barfoo"
            },
            {
                Id: "bar",
                PostTypeId: "baz",
                ParentId: "foo",
                CreationDate: "bar",
                Score: "5",
                Body: "baz",
                OwnerUserId: "foobar",
                LastActivityDate: "barbaz",
                CommentCount: "barfoo"
            }
        ]
        analyser = new XmlAnalyser()
    });

    describe("It analyses valid post data nodes", () => {

        it("Works out the first and last post", () => {
            details = analyser.toXmlAnalysis(postData).details as AnalysisDetails;
            expect(details.firstPost).toBe(postData[0].CreationDate);
            expect(details.lastPost).toBe(postData[postData.length - 1].CreationDate);
        });

        it("Calculates the average score", () => {
            details = analyser.toXmlAnalysis(postData).details as AnalysisDetails;
            expect(details.avgScore).toBe(4);
        });

        it("Filters out nodes that don't include post data", () => {
            details = analyser.toXmlAnalysis([...postData, "foo", "bar"]).details as AnalysisDetails;
            expect(details.totalPosts).toBe(postData.length);
        });

    });

    it("Returns an empty analysis with failure message if there are no post data nodes", () => {
        const emptyDetails = analyser.toXmlAnalysis(["foo", "bar"]).details as AnalysisFailed;
        expect(emptyDetails).toBe((AnalysisFailed.NoData));
    });

})
