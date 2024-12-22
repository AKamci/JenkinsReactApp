import { ActionDto } from "./ActionDto";

export interface BuildInfo {
    _class: string;
    number: number;
    url: string;
    building: boolean;
    result: string;
    timestamp: number;
    duration: number;
    actions: ActionDto[];
}

// http://localhost:8080/job/Folder4/job/Project42/api/json?tree=jobs[name,url,color,builds[number,url,status,timestamp,result,duration]{,3}]
// builds[number,url,status,timestamp,result,duration]{,3}