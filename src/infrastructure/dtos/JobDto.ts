import { BuildInfo } from "./BuildInfoDto";

export interface JobDto {
    _class: string;
    name: string;
    url: string;
    color: string;
    jobs?: JobDto[];
    lastBuild?: BuildInfo;
    onScoreChange?: (score: number) => void;
    isVisible?: boolean;
}