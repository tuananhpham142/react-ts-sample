import {
    CartAddItemRequest,
    CartReduceItemRequest,
    GetCartDetailRequest,
    RemoveCartItemRequest,
    RemoveCartRequest,
    UpdateItemRequest,
} from '@/models/Cart/CartRequest';
import { CartResponse, CartSummaryModel } from '@/models/Cart/CartResponse';
import { BaseAxiosResponseGetAll, BaseAxiosResponseGetDetail } from '@/types/common.types';
import axios from '../axios';

const addItemToCart = (request: CartAddItemRequest): Promise<BaseAxiosResponseGetDetail<CartResponse>> => {
    return axios
        .post<BaseAxiosResponseGetDetail<CartResponse>>(``, {
            ...request,
        })
        .then((res) => res.data);
};

const reduceItemFromCart = (request: CartReduceItemRequest): Promise<BaseAxiosResponseGetAll<CartResponse>> => {
    return axios
        .put<BaseAxiosResponseGetAll<CartResponse>>(``, {
            data: { ...request },
        })
        .then((res) => res.data);
};
const removeItemFromCart = (request: RemoveCartItemRequest): Promise<BaseAxiosResponseGetDetail<CartResponse>> => {
    return axios
        .put<BaseAxiosResponseGetDetail<CartResponse>>(``, {
            ...request,
        })
        .then((res) => res.data);
};
const updateItem = (request: UpdateItemRequest): Promise<BaseAxiosResponseGetDetail<CartResponse>> => {
    return axios
        .put<BaseAxiosResponseGetDetail<CartResponse>>(``, {
            ...request,
        })
        .then((res) => res.data);
};
const getCartDetail = (request: GetCartDetailRequest): Promise<BaseAxiosResponseGetDetail<CartResponse>> => {
    return axios.get<BaseAxiosResponseGetDetail<CartResponse>>(``).then((res) => res.data);
};
const getListCart = (request: {}): Promise<BaseAxiosResponseGetDetail<Array<CartSummaryModel>>> => {
    return axios.get<BaseAxiosResponseGetDetail<Array<CartSummaryModel>>>(``).then((res) => res.data);
};
const createCart = (request: {}): Promise<BaseAxiosResponseGetDetail<{}>> => {
    return axios
        .post<BaseAxiosResponseGetDetail>(``, {
            ...request,
        })
        .then((res) => res.data);
};
const removeCart = <T extends BaseAxiosResponseGetDetail<CartResponse>>(request: RemoveCartRequest): Promise<T> => {
    return axios
        .delete<T>(``, {
            data: request,
        })
        .then((res) => res.data);
};
const removeContact = <T extends BaseAxiosResponseGetDetail<CartResponse>>(request: RemoveCartRequest): Promise<T> => {
    return axios
        .delete<T>(``, {
            data: request,
        })
        .then((res) => res.data);
};
const services = {
    addItemToCart,
    reduceItemFromCart,
    removeItemFromCart,
    updateItem,
    getCartDetail,
    getListCart,
    createCart,
    removeCart,
    removeContact,
};
export default services;
