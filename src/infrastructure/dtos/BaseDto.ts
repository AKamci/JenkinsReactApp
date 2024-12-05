import { JobDto } from "./JobDto";

export interface BaseDto{
    _class?: string;
    jobs?: JobDto[];

}