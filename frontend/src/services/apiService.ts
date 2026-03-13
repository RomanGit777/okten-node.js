import axios, { AxiosError } from "axios";
import { authService } from "./authService";
import { router } from "../routes/router";
import { urls } from "../constants/urls";

const apiService = axios.create({baseURL:'/api'});

let isRefreshing = false;
type IWaitList = () => void;
const waitList: IWaitList[] = [];

apiService.interceptors.request.use(req => {

    const accessToken = authService.getAccessToken();

    if (accessToken) {
        req.headers.Authorization = `Bearer ${accessToken}`
    }

    return req;
})

// 1. You make a request
// 2. Server responds
// 3. Axios sends the response to your interceptor
// 4. If success → return response
// 5. If error → go to error handler
// 6. If 401 → try refresh
// 7. If refresh succeeds → retry original request + runAfterRefresh()
// 8. If refresh fails → delete tokens + redirect to login
// 9. If error is not 401 → reject it normally
// 10. If refresh request itself fails → reject immediately
// 11. If refresh is already happening → put request into waitList
// 12. After refresh finishes → retry all requests from waitList
apiService.interceptors.response.use(res => {
        return res
    },
    async (error: AxiosError) => {
        const originalRequest = error.config;

        if (error.response.status === 401) {

            if (!isRefreshing && authService.getRefreshToken()) {
                isRefreshing = true

                try {
                    await authService.refresh()
                    runAfterRefresh()
                    isRefreshing = false
                    return apiService(originalRequest)
                } catch (e) {
                    authService.deleteTokens()
                    isRefreshing = false
                    await router.navigate('/login?sessionExpired=true')
                    return Promise.reject(error)
                }
            }

            if (originalRequest.url === urls.auth.refresh) {
                return Promise.reject(error)
            }

            return new Promise(resolve => {
                subscribeToWaitList(()=>{
                    resolve(apiService(originalRequest))
                })
            })


        }
        return Promise.reject(error)
    }
)

const subscribeToWaitList = (cb:IWaitList) => {
    waitList.push(cb);
}

const runAfterRefresh = (): void => {
    while (waitList.length) {
        const cb = waitList.pop();
        cb();
    }
}

export {
    apiService
}