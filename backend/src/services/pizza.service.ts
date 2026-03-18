import { IPaginatedResponse } from "../interfaces/paginated.response";
import {
    IPizza,
    IPizzaCreateDTO,
    IPizzaQuery,
} from "../interfaces/pizza.interface.js";
import { pizzaRepository } from "../repositories/pizza.repository.js";

class PizzaService {
    public async getAll(
        query: IPizzaQuery,
    ): Promise<IPaginatedResponse<IPizza>> {
        const [data, totalItems] = await pizzaRepository.getAll(query);

        const totalPages = Math.ceil(totalItems / query.pageSize);

        return {
            totalItems,
            totalPages,
            prevPage: !!(query.page - 1),
            nextPage: query.page + 1 <= totalPages,
            data,
        };
    }

    public create(pizza: IPizzaCreateDTO): Promise<IPizza> {
        return pizzaRepository.create(pizza);
    }
}
export const pizzaService = new PizzaService();
