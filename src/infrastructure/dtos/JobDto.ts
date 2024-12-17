import { BuildInfo } from "./BuildInfoDto";

export interface JobDto{
    _class: string;
    url:string;
    name: string;
    color: string;
    builds: BuildInfo[];
    lastBuild: BuildInfo;
    jobs:JobDto[];
}