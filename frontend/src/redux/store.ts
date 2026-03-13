import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { pizzaReducer } from "./slices/pizzaSlice";

const store = configureStore({
    reducer: { auth: authReducer, pizza: pizzaReducer },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export {
    store,
};

export type {
    AppDispatch,
    RootState,
};