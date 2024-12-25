import { CausesDto } from "./CausesDto";

export interface ActionDtoForTest{
    _class:string;
    failCount:number;
    skipCount:number;
    passCount:number;
    totalCount:number;
    urlName:string;

}