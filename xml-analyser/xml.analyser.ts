import {XmlAnalysis} from "./xml.analysis";
import {PostData} from "./post.data";

export class XmlAnalyser {

    toXmlAnalysis(nodes: any[]): XmlAnalysis {
        const postNodes: PostData[] = nodes.filter(node => !!node.Id);
        return {
            firstPost: postNodes[0].CreationDate,
            lastPost: postNodes[postNodes.length - 1].CreationDate,
            totalPosts: postNodes.length,
            totalAcceptedPosts: postNodes.filter(node => !!node.AcceptedAnswerId).length,
            avgScore: this.toAverageScore(postNodes)
        };
    }

    private toAverageScore(nodes: PostData[]): number {
        const total = nodes.reduce((acc, curr) => acc += parseInt(curr.Score), 0);
        return total / nodes.length;
    }

}
