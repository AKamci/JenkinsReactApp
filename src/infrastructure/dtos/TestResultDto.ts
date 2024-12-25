export interface TestResultDto {
    _class: string;
    failCount: number;
    passCount: number;
    skipCount: number;
    suites: any[];
}