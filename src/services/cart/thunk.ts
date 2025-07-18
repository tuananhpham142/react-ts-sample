import {
    CartAddItemRequest,
    CartReduceItemRequest,
    GetCartDetailRequest,
    RemoveCartItemRequest,
    RemoveCartRequest,
    RemoveContactRequest,
    UpdateItemRequest
} from '@/models/Cart/CartRequest';
import { CartResponse, CartSummaryModel } from '@/models/Cart/CartResponse';
import { BaseAxiosResponseGetDetail } from '@/types/common.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import services from './services';

const addItemToCart = createAsyncThunk<CartResponse, CartAddItemRequest, {}>(
    'cart/addItemToCart',
    async (payload: CartAddItemRequest, { rejectWithValue }) => {
        try {
            const response: BaseAxiosResponseGetDetail<CartResponse> = await services.addItemToCart(payload);
            return response.Data;
        } catch (err: any) {
            return rejectWithValue({
                status: err.status,
                statusText: err.statusText,
                data: err.data,
            });
        }
    },
);
const reduceItemFromCart = createAsyncThunk<CartResponse, CartReduceItemRequest, {}>(
    'cart/reduceItemFromCart',
    async (payload: CartReduceItemRequest, { rejectWithValue }) => {
        try {
            const response: BaseAxiosResponseGetDetail<CartResponse> = await services.reduceItemFromCart(payload);

            return response.Data;
        } catch (err: any) {
            return rejectWithValue({
                status: err.status,
                statusText: err.statusText,
                data: err.data,
            });
        }
    },
);
const removeItemFromCart = createAsyncThunk<CartResponse, RemoveCartItemRequest, {}>(
    'cart/removeItemFromCart',
    async (payload: RemoveCartItemRequest, { rejectWithValue }) => {
        try {
            const response: BaseAxiosResponseGetDetail<CartResponse> = await services.removeItemFromCart(payload);

            return response.Data;
        } catch (err: any) {
            return rejectWithValue({
                status: err.status,
                statusText: err.statusText,
                data: err.data,
            });
        }
    },
);
const updateItem = createAsyncThunk<CartResponse, UpdateItemRequest, {}>(
    'cart/updateItem',
    async (payload: UpdateItemRequest, { rejectWithValue }) => {
        try {
            const response: BaseAxiosResponseGetDetail<CartResponse> = await services.updateItem(payload);

            return response.Data;
        } catch (err: any) {
            return rejectWithValue({
                status: err.status,
                statusText: err.statusText,
                data: err.data,
            });
        }
    },
);
const getCartDetail = createAsyncThunk<CartResponse, GetCartDetailRequest, {}>(
    'cart/getCartDetail',
    async (payload: GetCartDetailRequest, { rejectWithValue }) => {
        try {
            const response: BaseAxiosResponseGetDetail<CartResponse> = await services.getCartDetail(payload);

            return response.Data;
        } catch (err: any) {
            return rejectWithValue({
                status: err.status,
                statusText: err.statusText,
                data: err.data,
            });
        }
    },
);
const selectCart = createAsyncThunk<CartResponse, GetCartDetailRequest, {}>(
    'cart/selectCart',
    async (payload: GetCartDetailRequest, { dispatch, rejectWithValue }) => {
        try {
            const response: BaseAxiosResponseGetDetail<CartResponse> = await services.getCartDetail(payload);

            return response.Data;
        } catch (err: any) {
            return rejectWithValue({
                status: err.status,
                statusText: err.statusText,
                data: err.data,
            });
        }
    },
);
const getListCart = createAsyncThunk<Array<CartSummaryModel>, {}, {}>(
    'cart/getListCart',
    async (payload: {}, { rejectWithValue }) => {
        try {
            const response: BaseAxiosResponseGetDetail<Array<CartSummaryModel>> = await services.getListCart(payload);

            return response.Data;
        } catch (err: any) {
            return rejectWithValue({
                status: err.status,
                statusText: err.statusText,
                data: err.data,
            });
        }
    },
);
const createCart = createAsyncThunk<any, any, {}>('cart/createCart', async (payload: {}, { rejectWithValue }) => {
    try {
        const response: BaseAxiosResponseGetDetail = await services.createCart(payload);

        return response.Data;
    } catch (err: any) {
        return rejectWithValue({
            status: err.status,
            statusText: err.statusText,
            data: err.data,
        });
    }
});
const removeCart = createAsyncThunk<CartResponse, RemoveCartRequest, {}>(
    'cart/removeCart',
    async (payload: RemoveCartRequest, { rejectWithValue }) => {
        try {
            const response: BaseAxiosResponseGetDetail<CartResponse> = await services.removeCart(payload);
            return response.Data;
        } catch (err: any) {
            return rejectWithValue({
                status: err.status,
                statusText: err.statusText,
                data: err.data,
            });
        }
    },
);
const removeContact = createAsyncThunk<CartResponse, RemoveContactRequest, {}>(
    'cart/removeContact',
    async (payload: RemoveContactRequest, { rejectWithValue }) => {
        try {
            const response: BaseAxiosResponseGetDetail<CartResponse> = await services.removeContact(payload);
            return response.Data;
        } catch (err: any) {
            return rejectWithValue({
                status: err.status,
                statusText: err.statusText,
                data: err.data,
            });
        }
    },
);
const thunkActions = {
    addItemToCart,
    reduceItemFromCart,
    removeItemFromCart,
    updateItem,
    getCartDetail,
    selectCart,
    getListCart,
    createCart,
    removeCart,
    removeContact,
};
export default thunkActions;
