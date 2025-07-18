import { LoginResponse } from '@/models/Auth/AuthResponse';
import getCookie from '@/utils/cookies/getCookie';
import {
    BaseQueryFn,
    EndpointBuilder,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    createApi,
    fetchBaseQuery,
    retry,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { QueryReturnValue } from 'src/declarations';
import { login, logout } from './auth/slice';
import { RootState } from './store';

const mutex = new Mutex();

export const API_URL = import.meta.env.VITE_API_URL;

interface ExtendedHeaders extends Headers {
    ClientId?: string;
    ClientSecret?: string;
}
const staggeredBaseQuery = retry(
    fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers: ExtendedHeaders, { getState }) => {
            const appState = getState() as RootState;
            const accessToken = appState.auth.data.AccessToken;
            if (accessToken) {
                headers.set('authorization', `Bearer ${accessToken}`);
                headers.set('AcceptLanguage', getCookie(import.meta.env.VITE_LANGUAGE as string));
            }
            return headers;
        },
    }),
    {
        maxRetries: 0,
    },
);

const baseQueryWithReAuth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    any,
    FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
    let result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta> = (await staggeredBaseQuery(
        args,
        api,
        extraOptions,
    )) as QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>;

    if (result?.error) {
        const { getState, dispatch } = api;
        const appState = getState() as RootState;
        const refreshToken = appState.auth.data.RefreshToken;

        switch (result.error.status) {
            case 401:
                if (!mutex.isLocked()) {
                    const release = await mutex.acquire();
                    try {
                        type GetRefreshTokenResult = {
                            data?: {
                                Code: 1 | -11; // 1 || -11
                                Message: string; // Success || Refresh token is invalid
                                Data: LoginResponse | null;
                            };
                        };

                        const refreshResult = (await staggeredBaseQuery(
                            {
                                url: `${import.meta.env.VITE_API_URL}/api/account/token/refresh/${refreshToken}`,
                                method: 'GET',
                            },
                            api,
                            extraOptions,
                        )) as GetRefreshTokenResult;

                        if (
                            refreshResult.data &&
                            'Code' in refreshResult.data &&
                            refreshResult.data.Code > 0 &&
                            refreshResult.data.Data?.AccessToken &&
                            refreshResult.data.Data?.RefreshToken &&
                            refreshResult.data.Data?.Expires
                        ) {
                            dispatch(
                                login({
                                    AccessToken: refreshResult?.data?.Data?.AccessToken,
                                    Expires: refreshResult?.data?.Data?.Expires,
                                    RefreshToken: refreshResult?.data?.Data?.RefreshToken,
                                }),
                            );
                            result = await staggeredBaseQuery(args, api, extraOptions);
                        } else {
                            dispatch(logout());
                        }
                    } catch (error) {
                        console.log(error);
                    } finally {
                        release();
                    }
                } else {
                    // wait until the mutex is available without locking it
                    await mutex.waitForUnlock();
                    result = await staggeredBaseQuery(args, api, extraOptions);
                }

                return result;
            case 403:
                return result;
            case 400:
                // if (result?.error?.data && typeof result?.error?.data === 'object') {
                //     if ('Message' in result.error.data) {
                //     }

                //     if ('title' in result.error.data) {
                //     }
                // }
                return result;
            default:
                return result;
        }
    }
    return result;
};

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['workgroup', 'tenant', 'user', 'auth'],
    endpoints: () => ({}),
});

export type ApiEndPointBuilder = EndpointBuilder<
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
    string,
    string
>;
