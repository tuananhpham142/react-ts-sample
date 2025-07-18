import slice from './slice';
import thunkActions from './thunk';
export const { reducer } = slice;

const actions: typeof slice.actions & typeof thunkActions = {
    ...slice.actions,
    ...thunkActions,
};
const {
    addCart,
    removeCart,
    removeContact,
    addItemToCart,
    getCartDetail,
    getListCart,
    reduceItemFromCart,
    removeItemFromCart,
    updateItem,
    createCart,
} = actions;

export {
    addCart,
    addItemToCart,
    createCart,
    getCartDetail,
    getListCart,
    reduceItemFromCart,
    removeCart,
    removeContact,
    removeItemFromCart,
    updateItem
};
export default actions;
