import { Pizzas } from "../components/PizzaComponents/Pizzas";
import { PizzaCreate } from "../components/PizzaComponents/PizzaCreate";

export const PizzasPage = () => {
    return (
        <>
            <PizzaCreate/>
            <hr/>
            <Pizzas/>
        </>);
};