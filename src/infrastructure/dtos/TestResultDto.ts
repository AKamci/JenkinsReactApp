import { ActionDtoForTest } from "./ActionDtoForTest";

export interface TestResultDto {
    _class: string;
    actions: ActionDtoForTest[];
}