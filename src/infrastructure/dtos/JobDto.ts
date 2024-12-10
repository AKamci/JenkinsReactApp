import { BuildInfo } from "./BuildInfoDto";

export interface JobDto{
    _class: string;
    url:string;
    name: string;
    color: string;
    lastBuild: BuildInfo;
    jobs:JobDto[];
}