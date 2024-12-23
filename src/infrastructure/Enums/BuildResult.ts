export enum BuildResult {
    SUCCESS = 'SUCCESS',
    FAILURE = 'FAILURE',
    UNSTABLE = 'UNSTABLE',
    ABORTED = 'ABORTED',
    NOT_BUILT = 'NOT_BUILT',
    CANCELLED = 'CANCELLED',
    IN_PROGRESS = 'IN_PROGRESS',
    PENDING = 'PENDING',
    TIMEOUT = 'TIMEOUT',
    null = 'null'
}

export interface BuildResultDetails {
    result: BuildResult;
    description: string;
    severity: 'success' | 'error' | 'warning' | 'info';
}

export const BUILD_RESULT_DETAILS: Record<BuildResult, BuildResultDetails> = {
    [BuildResult.SUCCESS]: {
        result: BuildResult.SUCCESS,
        description: 'Build başarıyla tamamlandı',
        severity: 'success'
    },
    [BuildResult.FAILURE]: {
        result: BuildResult.FAILURE,
        description: 'Build başarısız oldu',
        severity: 'error'
    },
    [BuildResult.UNSTABLE]: {
        result: BuildResult.UNSTABLE,
        description: 'Build kararsız durumda',
        severity: 'warning'
    },
    [BuildResult.ABORTED]: {
        result: BuildResult.ABORTED,
        description: 'Build iptal edildi',
        severity: 'warning'
    },
    [BuildResult.NOT_BUILT]: {
        result: BuildResult.NOT_BUILT,
        description: 'Build henüz oluşturulmadı',
        severity: 'info'
    },
    [BuildResult.CANCELLED]: {
        result: BuildResult.CANCELLED,
        description: 'Build kullanıcı tarafından iptal edildi',
        severity: 'info'
    },
    [BuildResult.IN_PROGRESS]: {
        result: BuildResult.IN_PROGRESS,
        description: 'Build devam ediyor',
        severity: 'info'
    },
    [BuildResult.PENDING]: {
        result: BuildResult.PENDING,
        description: 'Build beklemede',
        severity: 'info'
    },
    [BuildResult.TIMEOUT]: {
        result: BuildResult.TIMEOUT,
        description: 'Build zaman aşımına uğradı',
        severity: 'error'
    },
    [BuildResult.null]: {
        result: BuildResult.null,
        description: 'Build yapılıyor ve tamamlanmamış',
        severity: 'info'
    }
};

export function getBuildResultDetails(result: BuildResult | null): BuildResultDetails {
    if (!result) {
        return BUILD_RESULT_DETAILS[BuildResult.null];
    }
    return BUILD_RESULT_DETAILS[result] || BUILD_RESULT_DETAILS[BuildResult.null];
}
