import { FilterQuery } from "mongoose";

import {
    IPizza,
    IPizzaCreateDTO,
    IPizzaQuery,
} from "../interfaces/pizza.interface.js";
import { Pizza } from "../models/pizza.model.js";

class PizzaRepository {
    public getAll(query: IPizzaQuery): Promise<[IPizza[], number]> {
        const skip = query.pageSize * (query.page - 1);
        //if filterObject is empty, match everything, if obj filled, match data from there
        const filterObjects: FilterQuery<IPizza> = {};

        if (query.name) {
            filterObjects.name = { $regex: query.name, $options: "i" };
        }

        if (query.price) {
            filterObjects.price = query.price;
        }

        if (query.diameter) {
            filterObjects.diameter = query.diameter;
        }

        return Promise.all([
            Pizza.find(filterObjects)
                .limit(query.pageSize)
                .skip(skip)
                .sort(query.order),
            Pizza.find(filterObjects).countDocuments(),
        ]);
    }

    public create(pizza: IPizzaCreateDTO): Promise<IPizza> {
        return Pizza.create(pizza);
    }
}
export const pizzaRepository = new PizzaRepository();
