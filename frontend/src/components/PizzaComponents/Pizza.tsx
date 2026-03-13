import React, { FC } from "react";
import { IPizza } from "../../interfaces/pizzaInterface";

interface PizzaProps {
    pizza: IPizza;
}

const Pizza: FC<PizzaProps> = ({ pizza }) => {
    const { name,price,diameter } = pizza;
    return (
        <div>
            {
                <div>
                    <div>name:{name}</div>
                    <div>price:{price}</div>
                    <div>diameter:{diameter}</div>
                    <hr/>
                </div>

            }
        </div>
    );
};

export { Pizza };