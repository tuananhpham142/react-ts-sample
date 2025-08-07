import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { reducer as authReducer } from './auth';
import { reducer as cartReducer } from './cart';
import listenerMiddleware from './redux-middleware';

const appReducer = combineReducers({
    // [api.reducerPath]: api.reducer,
    auth: authReducer,
    cart: cartReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [''],
};

const reducer = persistReducer(persistConfig, appReducer);

const store = configureStore({
    reducer: reducer,
    devTools: import.meta.env.VITE_NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }).prepend(listenerMiddleware.middleware),
    // .concat(api.middleware),
});

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const persistor = persistStore(store);

export default store;
