import { LoginRequest } from '@/models/Auth/AuthRequest';
import { LoginResponse } from '@/models/Auth/AuthResponse';
import { ApiEndPointBuilder } from '@/services/api';
import { BaseAxiosResponseAuth } from '@/types/common.types';

export const login = (builder: ApiEndPointBuilder) =>
    builder.mutation<BaseAxiosResponseAuth<LoginResponse>, LoginRequest>({
        query: (arg: LoginRequest) => ({
            url: ``,
            method: 'POST',
            body: arg,
        }),
        transformResponse: async (response: BaseAxiosResponseAuth<LoginResponse>, meta: any, arg: LoginRequest) => {
            if (!response || response.Code < 0) {
                return response as BaseAxiosResponseAuth<LoginResponse>;
            }
            return response as BaseAxiosResponseAuth<LoginResponse>;
        },
        async onQueryStarted(arg, { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry }) {},
    });
