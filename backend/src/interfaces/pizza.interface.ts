import { IBase } from "./base.interface";
import { IBaseQuery } from "./base.query.interface";

interface IPizza extends IBase {
    _id: string;
    name: string;
    price: number;
    diameter: number;
}

interface IPizzaQuery extends IBaseQuery {
    name?: string;
    price?: number;
    diameter?: number;
}

type IPizzaCreateDTO = Pick<IPizza, "name" | "diameter" | "price">;

export type { IPizza, IPizzaCreateDTO, IPizzaQuery };
