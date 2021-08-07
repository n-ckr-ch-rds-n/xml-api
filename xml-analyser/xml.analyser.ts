import {XmlAnalysis} from "./xml.analysis";
import {PostData} from "./post.data";

export class XmlAnalyser {

    toXmlAnalysis(nodes: any[]): XmlAnalysis {
        const postData: PostData[] = nodes.filter(node => this.isPostDataNode(node));
        const details = {
            firstPost: postData[0].CreationDate,
            lastPost: postData[postData.length - 1].CreationDate,
            totalPosts: postData.length,
            totalAcceptedPosts: postData.filter(node => !!node.AcceptedAnswerId).length,
            avgScore: this.toAverageScore(postData)
        };
        return {analyseDate: new Date().toISOString(), details};
    }

    private isPostDataNode(node: any): boolean {
        return node.Id && node.CreationDate;
    }

    private toAverageScore(nodes: PostData[]): number {
        const total = nodes.reduce((acc, curr) => acc += parseInt(curr.Score), 0);
        return total / nodes.length;
    }

}
