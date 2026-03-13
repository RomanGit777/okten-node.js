import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useEffect } from "react";
import { pizzaActions } from "../../redux/slices/pizzaSlice";
import { Pizza } from "./Pizza";

export const Pizzas = () => {

    const { pizzas, trigger } = useAppSelector(state => state.pizza);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(pizzaActions.getAll());
    }, [dispatch, trigger]);
    return (
        <div>
            {
                pizzas.map((pizza) => <Pizza key={pizza._id} pizza={pizza} />)
            }
        </div>
    );
};