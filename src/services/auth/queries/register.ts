import { RegisterRequest } from '@/models/Auth/AuthRequest';
import { RegisterResponse } from '@/models/Auth/AuthResponse';
import { ApiEndPointBuilder } from '@/services/api';
import { BaseAxiosResponseAuth } from '@/types/common.types';

export const register = (builder: ApiEndPointBuilder) =>
    builder.mutation<BaseAxiosResponseAuth<RegisterResponse>, RegisterRequest>({
        query: (arg: RegisterRequest) => ({
            url: '',
            method: 'POST',
            body: { ...arg },
        }),
        transformResponse: async (response: BaseAxiosResponseAuth<RegisterResponse>, meta: any, arg: any) => {
            return response as BaseAxiosResponseAuth<RegisterResponse>;
        },
        async onQueryStarted(arg, { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry }) {},
    });
