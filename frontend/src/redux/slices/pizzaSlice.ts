import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPizza } from "../../interfaces/pizzaInterface";
import { PizzasService } from "../../services/pizzasService";

interface IState {
    pizzas: IPizza[];
    trigger: boolean;
}

const initialState: IState = {
    pizzas: [],
    trigger: null
};

const getAll = createAsyncThunk<IPizza[], void>(
    "pizzasSlice/getAll",
    async(_, { rejectWithValue }) => {
        try {
            const { data } = await PizzasService.getAll();
            return data;
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);

const create = createAsyncThunk<IPizza, { pizza: IPizza }>(
    "pizzasSlice/create",
    async({ pizza }, {rejectWithValue}) => {
        try {
            const { data } = await PizzasService.create(pizza);
            return data;
        } catch (e) {
            return rejectWithValue(e);
        }
    }
)

const PizzasSlice = createSlice({
    name : "pizzaSlice",
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.pizzas = action.payload
            })
            .addCase(create.fulfilled, (state, action) => {
                state.trigger = !state.trigger
            })
});

const { reducer: pizzaReducer, actions } = PizzasSlice;

const pizzaActions = {
    ...actions,
    create,
    getAll
}

export {
    pizzaReducer,
    pizzaActions
}