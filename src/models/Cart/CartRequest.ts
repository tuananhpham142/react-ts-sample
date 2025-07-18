import { CartItemRequestModel } from './CartModel';

export type GetDetailCartRequest = {
    id: string;
};

export type CreateCartRequest = {
    CartId: string;
    ListItem: Array<CartItemRequestModel>;
};

export type UpdateCartRequest = CreateCartRequest;

export type CartItemRequest = {
    CartId: string;
    Item: CartItemRequestModel;
};

export type CartUpdateItemRequest = {
    Id?: string;
    CartId: string;
    GroupServiceId: string;
    Count: number;
    CartItemId: string;
    Note: string;
    AdditionItems: Array<string>;
    UsingDate: Array<string>;
};

export type CartReduceItemRequest = {
    Id?: string;
    CartId: string | null;
    GroupServiceId: string;
    Count: number;
    CartItemId: string;
};

export type CartRemoveItemRequest = {
    Id?: string;
    CartId: string;
    GroupServiceId: string;
    CartItemId: string;
};

export type CartAddItemRequest = {
    CartId: string;
    ListingPropertyId: string;
    ItemId?: string;
    Count?: number;
    Note: string;
    AddOnItems: Array<any>;
    UsingDate: string;
};

export type GetCartDetailRequest = {
    Id: string;
};

export type RemoveCartItemRequest = {
    CartId: string;
    ListingPropertyId: string;
    CartItemId: string;
};
export type RemoveCartRequest = {
    CartId: string;
};
export type RemoveContactRequest = {
    CartId: string;
};
export type UpdateItemRequest = {
    CartId: string;
    Count?: number;
    Note: string;
    ListingPropertyId: string;
    AddOnItems: Array<any>;
};

export type CreateOrderFromCartRequest = {
    CartId: string;
    ClientIp?: string;
    LanguageCode?: string;
    ListItem?: Array<CreateOrderFromCartListItemRequest>;
    Contact: CreateOrderFromCartContactRequest;
    CustomerId: string;
    CustomerContactId?: string;
    BankId?: number;
    PaymentId?: number;
    CashReceive?: number;
    CashReturn?: number;
    TotalPrice?: number;
    Currency?: number;
    From?: number;
    DistributorId?: string;
    CId?: string;
    Affiliate?: CreateOrderFromCartAffiliateRequest;
};
export type CreateOrderFromCartAffiliateRequest = {
    ShortlinkCode: string;
    CampaignCode: string;
    PublisherCode: string;
    UtmSource: string;
    UtmCampaign: string;
    UtmContent: string;
    UtmTerm: string;
    UtmMedium: string;
    Device: string;
    Platform: string;
};
export type CreateOrderFromCartContactRequest = {
    Address: string;
    Title: string;
    FirstName: string;
    Name: string;
    Phone: string;
    Email: string;
};
export type CreateOrderFromCartListItemRequest = {
    CartItemId: string;
};

export type ApplyVoucherToCartRequest = {
    CartId: string;
    VoucherCode: string;
};
export type RemoveVoucherFromCartRequest = {
    CartId: string;
    VoucherCode: string;
};
