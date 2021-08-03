import {XmlAnalysis} from "./xml.analysis";

export class XmlAnalyser {

    toXmlAnalysis(nodes: any[]): XmlAnalysis {
        const postNodes = nodes.filter(node => !!node.Id);
        return {
            firstPost: postNodes[0].CreationDate,
            lastPost: postNodes[postNodes.length - 1].CreationDate,
            totalPosts: postNodes.length,
            totalAcceptedPosts: postNodes.filter(node => !!node.AcceptedAnswerId).length,
            avgScore: this.toAverageScore(postNodes)
        };
    }

    private toAverageScore(nodes: any[]): number {
        const total = nodes.reduce((pre, curr) => pre += parseInt(curr.Score), 0);
        return total / nodes.length;
    }

}
