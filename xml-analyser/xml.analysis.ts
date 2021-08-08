import {AnalysisDetails} from "./analysis.details";
import {AnalysisFailed} from "./analysis.failed";

export interface XmlAnalysis {
    analyseDate: string;
    details: AnalysisDetails | AnalysisFailed;
}
