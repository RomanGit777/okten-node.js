import { AxiosResponse } from "axios";

export type IResp<T> = Promise<AxiosResponse<T>>