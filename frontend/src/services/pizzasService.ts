import { IResp } from "../types/respType";
import { IPizza } from "../interfaces/pizzaInterface";
import { apiService } from "./apiService";
import { urls } from "../constants/urls";

export const PizzasService = {
    getAll(): IResp<IPizza[]>{
        return apiService.get(urls.pizzas)
    },
    create(pizza: IPizza): IResp<IPizza> {
        return apiService.post(urls.pizzas, pizza);
    }
}