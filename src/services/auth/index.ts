import slice from './slice';
import * as thunk from './thunk';
export const { reducer } = slice;

const actions: typeof slice.actions = {
    ...slice.actions,
    ...thunk,
};

export type TypesActions = typeof slice.actions;
export type TypesState = ReturnType<typeof reducer>;

const { loginReducer, logoutReducer } = actions;
export { loginReducer, logoutReducer };

export default actions;
