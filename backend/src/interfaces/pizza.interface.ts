import { IBase } from "./base.interface";

interface IPizza extends IBase {
    _id: string;
    name: string;
    price: number;
    diameter: number;
}

type IPizzaCreateDTO = Pick<IPizza, "name" | "diameter" | "price">;

export type { IPizza, IPizzaCreateDTO };
