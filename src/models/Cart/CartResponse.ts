import { CartListItemModel, CartModel } from './CartModel';

export type CartResponse = {
    CartId: string;
    ListItem: Array<CartListItemModel>;
    CustomerInfo: null;
    Contact: any;
    ListTicketCode: Array<string>;
    DisWorkgroupId: number;
    DistributorId: string;
    PoeWorkgroupId: number;
    PlaceOrEventId: string;
    TenantId: number;
    WorkgroupId: number;
    Expires: number;
};

export type CartSummaryModel = {
    Id: string;
    CartId: string;
    TotalItems: number;
    Code: string;
    CustomerName: string;
};

export type AddCartItemResponse = CartModel;

export type GetCartDetailResponse = CartModel;

export type RemoveCartItemResponse = CartModel;

export type UpdateItemResponse = CartModel;
