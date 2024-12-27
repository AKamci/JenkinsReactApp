import { CausesDto } from "./CausesDto";

export interface ActionDto {
    _class?: string;
    causes?: CausesDto[];
    [key: string]: any;
}