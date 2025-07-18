import { CartModel } from '@/models/Cart/CartModel';
import { createSlice } from '@reduxjs/toolkit';
import thunkActions from './thunk';

type CartInitialState = {
    carts: Array<{ CartId: string; Total: number }>;
    cart: CartModel | null;
    isLoading?: boolean;
    isFetchingCart?: boolean;
    isCreatingOrder?: boolean;
};

const initialState: CartInitialState = {
    carts: [],
    // localCarts: [],
    cart: null,
    isLoading: false,
    isFetchingCart: false,
    isCreatingOrder: false,
};
const slice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart: (state, action) => {},
    },
    extraReducers: (builder) => {
        //createCart
        builder.addCase(thunkActions.createCart.pending, (state: any, action: any) => {
            return { ...state, isLoading: true };
        });
        builder.addCase(thunkActions.createCart.fulfilled, (state: any, action: any) => {
            return {
                ...state,
                carts: action.payload,
                isLoading: false,
            };
        });
        builder.addCase(thunkActions.createCart.rejected, (state: any, action: any) => {
            return { ...state, isLoading: false };
        });
        // addItemToCart
        builder.addCase(thunkActions.addItemToCart.pending, (state: any, action: any) => {
            return { ...state, isLoading: true };
        });
        builder.addCase(thunkActions.addItemToCart.fulfilled, (state: any, action: any) => {
            const currentState: CartInitialState = JSON.parse(JSON.stringify(state));

            // Tìm phần tử giỏ hàng hiện tại
            const indexCurrentCart = currentState.carts.findIndex((item) => item.CartId === action.payload.CartId);

            if (indexCurrentCart !== -1) {
                // Cập nhật đối tượng giỏ hàng
                currentState.carts[indexCurrentCart] = {
                    CartId: currentState.carts[indexCurrentCart].CartId,
                    Total: action.payload.ListItem.map((item: any) => item.Count).reduce(
                        (acc: any, cur: any) => acc + cur,
                        0,
                    ),
                };
            }
            return {
                ...state,
                carts: currentState.carts,
                cart: action.payload,
                isLoading: false,
            };
        });
        builder.addCase(thunkActions.addItemToCart.rejected, (state: any, action: any) => {
            return { ...state, isLoading: false };
        });
        // reduceItemFromCart
        builder.addCase(thunkActions.reduceItemFromCart.pending, (state: any, action: any) => {
            return { ...state, isLoading: true };
        });
        builder.addCase(thunkActions.reduceItemFromCart.fulfilled, (state: any, action: any) => {
            return {
                ...state,
                isLoading: false,
            };
        });
        builder.addCase(thunkActions.reduceItemFromCart.rejected, (state: any, action: any) => {
            return { ...state, isLoading: false };
        });
        // removeItemFromCart
        builder.addCase(thunkActions.removeItemFromCart.pending, (state: any, action: any) => {
            return { ...state, isLoading: true };
        });
        builder.addCase(thunkActions.removeItemFromCart.fulfilled, (state: any, action: any) => {
            return {
                ...state,
                cart: action.payload,
                isLoading: false,
            };
        });
        builder.addCase(thunkActions.removeItemFromCart.rejected, (state: any, action: any) => {
            return { ...state, isLoading: false };
        });
        // removeCart
        builder.addCase(thunkActions.removeCart.pending, (state: any, action: any) => {
            return { ...state, isLoading: true };
        });
        builder.addCase(thunkActions.removeCart.fulfilled, (state: any, action: any) => {
            const currentState: CartInitialState = JSON.parse(JSON.stringify(state));
            const newListCart = currentState.carts.filter((item) => item.CartId !== action.payload);
            return {
                ...state,
                cart: null,
                carts: newListCart,
                isLoading: false,
            };
        });

        builder.addCase(thunkActions.removeCart.rejected, (state: any, action: any) => {
            return { ...state, isLoading: false };
        });
        // remove contact
        builder.addCase(thunkActions.removeContact.pending, (state: any, action: any) => {
            return { ...state, isLoading: true };
        });
        builder.addCase(thunkActions.removeContact.fulfilled, (state: any, action: any) => {
            return {
                ...state,
                cart: action.payload,
                isLoading: false,
            };
        });
        builder.addCase(thunkActions.removeContact.rejected, (state: any, action: any) => {
            return { ...state, isLoading: false };
        });
        // updateItem
        builder.addCase(thunkActions.updateItem.pending, (state: any, action: any) => {
            return { ...state, isLoading: true };
        });
        builder.addCase(thunkActions.updateItem.fulfilled, (state: any, action: any) => {
            return { ...state, cart: action.payload, isLoading: false };
        });
        builder.addCase(thunkActions.updateItem.rejected, (state: any, action: any) => {
            return { ...state, isLoading: false };
        });
        // getCartDetail
        builder.addCase(thunkActions.getCartDetail.pending, (state: any, action: any) => {
            return { ...state, isFetchingCart: true };
        });
        builder.addCase(thunkActions.getCartDetail.fulfilled, (state: any, action: any) => {
            return {
                ...state,
                cart: action.payload,
                isFetchingCart: false,
            };
        });
        builder.addCase(thunkActions.getCartDetail.rejected, (state: any, action: any) => {
            return { ...state, isFetchingCart: false };
        });
        // selectCart
        builder.addCase(thunkActions.selectCart.pending, (state: any, action: any) => {
            return { ...state, cart: action.payload, isFetchingCart: true };
        });
        builder.addCase(thunkActions.selectCart.fulfilled, (state: any, action: any) => {
            return {
                ...state,
                cart: action.payload,
                isFetchingCart: false,
            };
        });
        builder.addCase(thunkActions.selectCart.rejected, (state: any, action: any) => {
            return { ...state, isFetchingCart: false };
        });
        // getListCart
        builder.addCase(thunkActions.getListCart.pending, (state: any, action: any) => {
            return { ...state, isLoading: true };
        });
        builder.addCase(thunkActions.getListCart.fulfilled, (state: any, action: any) => {
            return {
                ...state,
                carts: action.payload,
                isLoading: false,
            };
        });
        builder.addCase(thunkActions.getListCart.rejected, (state: any, action: any) => {
            return { ...state, carts: [], isLoading: false };
        });
    },
});

export default slice;
