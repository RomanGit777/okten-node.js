import { IPizza, IPizzaCreateDTO } from "../interfaces/pizza.interface.js";
import { Pizza } from "../models/pizza.model.js";

class PizzaRepository {
    public getAll(): Promise<IPizza[]> {
        return Pizza.find();
    }

    public create(pizza: IPizzaCreateDTO): Promise<IPizza> {
        return Pizza.create(pizza);
    }
}
export const pizzaRepository = new PizzaRepository();
