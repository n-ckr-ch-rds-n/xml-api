import {XmlAnalysis} from "./xml.analysis";
import {PostData} from "./post.data";
import {AnalysisDetails} from "./analysis.details";
import {AnalysisFailed} from "./analysis.failed";

export class XmlAnalyser {

    toXmlAnalysis(nodes: any[]): XmlAnalysis {
        const postData: PostData[] = nodes.filter(node => this.isPostDataNode(node));
        return {
            analyseDate: new Date().toISOString(),
            details: postData.length
                ? this.toAnalysisDetails(postData)
                : AnalysisFailed.NoData
        };
    }

    private toAnalysisDetails(postData: PostData[]): AnalysisDetails {
        return {
            firstPost: postData[0].CreationDate,
            lastPost: postData[postData.length - 1].CreationDate,
            totalPosts: postData.length,
            totalAcceptedPosts: postData.filter(node => !!node.AcceptedAnswerId).length,
            avgScore: this.toAverageScore(postData)
        }
    }

    private isPostDataNode(node: any): boolean {
        return node.Id && node.CreationDate && node.Score;
    }

    private toAverageScore(nodes: PostData[]): number {
        const total = nodes.reduce((acc, curr) => acc += parseInt(curr.Score), 0);
        return total / nodes.length;
    }

}
