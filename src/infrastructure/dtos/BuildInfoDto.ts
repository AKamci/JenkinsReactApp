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