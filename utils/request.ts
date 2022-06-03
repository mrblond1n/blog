export type TInterceptor = (data: any) => any;

export const defaultInterceptor: TInterceptor = (response: any): any => {
    if (response) return response;

    throw new Error('bad request');
};

export type TResponse<Result> = {
    response: Response;
    data: Result & {
        status_code: number;
    };
};
