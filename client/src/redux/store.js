import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';


export const store = configureStore({
    reducer: {
        user: userReducer
        // reducers
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});