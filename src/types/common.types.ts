import { AxiosRequestConfig, AxiosResponseHeaders, RawAxiosResponseHeaders } from './axios';

export interface AxiosValidateError<E = any, T = Array<any | string>> {
    type: string;
    title: string;
    status: number;
    traceId: string;
    errors: PartialType<E, T>;
    Message?: any;
}

export interface AxiosResponse<T = any, D = any> {
    data: T;
    status: number;
    statusText: string;
    headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
    config: AxiosRequestConfig<D>;
    request?: any;
}
export interface TransformerInclude<T> {
    data: T;
}
export interface TypeSelect {
    id: number;
    value: string;
}
export interface BaseAxiosResponseGetDetail<T = any> {
    Data: T;
    Code: number;
    Message: string;
}
export type BaseErrorResponse<T = any, E = any> = {
    Data: T;
    Detail: E;
    Code: number;
    Message?: string;
};
export interface BaseAxiosResponseGetAll<T = any> {
    Data: T;
    Code: number;
    Message: string;
}
export interface BaseAxiosResponseAuth<T = any> {
    Data: T;
    Code: number;
    Message: string;
}
export interface PaginationDataResponse<T = any> {
    PageIndex: number;
    PageSize: number;
    Result: T;
    Total: number;
}
export interface BaseAxiosResponse<T = any> {
    Data: PaginationDataResponse<T>;
    Code: number;
    Message: string;
}
export interface BaseAxiosResponseWithoutPaging<T = any> {
    data: T;
}
export interface ListGeneralFilter {
    perPage?: number | 10;
    page?: number | 1;
    selectField?: string | null;
    keyword?: string | null;
    status?: string | null;
}
export interface DefaultStrictSelectOption {
    label: any;
    value: any;
}
export declare type IsArray<E, T> = E extends any[] ? T[] : T;

export interface PaginationInterface {
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    lastPage: number;
    length: number;
    perPage: number;
    nextPage: number;
    previousPage: number;
}
declare type PartialType<E, T = any> = {
    [P in keyof E]: T;
};
export declare type AddExtraType<Interface, Type> = {
    [I in keyof Interface]: Interface[I] | Type;
};
export declare type ErrorResponse = {
    requestId: string;
    rejectedWithValue: boolean;
    requestStatus: 'rejected';
    aborted: boolean;
    condition: boolean;
};
export declare type MetaTags = {
    title: string;
    description: string;
    image: string;
    url: string;
    canonical?: string;
};
export interface DefaultStrictSelectOption {
    label: any;
    value: any;
}
export declare type ClassNameMap<T extends string = string> = Record<T, string>;
export interface StyledComponentProps<ClassKey extends string = string> {
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<ClassNameMap<ClassKey>>;
}
export interface CustomClasses<T extends string = string> {
    customClasses?: Partial<ClassNameMap<T>>;
}
export { };

