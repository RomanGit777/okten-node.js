import { IPizza, IPizzaCreateDTO } from "../interfaces/pizza.interface.js";
import { pizzaRepository } from "../repositories/pizza.repository.js";

class PizzaService {
    public getAll(): Promise<IPizza[]> {
        return pizzaRepository.getAll();
    }

    public create(pizza: IPizzaCreateDTO): Promise<IPizza> {
        return pizzaRepository.create(pizza);
    }
}
export const pizzaService = new PizzaService();
