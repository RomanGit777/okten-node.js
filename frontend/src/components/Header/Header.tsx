import style from './header.module.css'
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { authService } from "../../services/authService";
import { authActions } from "../../redux/slices/authSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";
export const Header = () => {

    const me = useAppSelector(state => state.auth.me);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (authService.getAccessToken() && !me){
            dispatch(authActions.me());
        }
    }, [dispatch, me]);


    return (
        <header className={style.header}>
            {
                me ?
                    <div className={style.name}>
                        {me.name}
                    </div>
                    :
                    <div>
                        <Link to={'/login'}>Login</Link>
                        <Link to={'/register'}>Register</Link>
                    </div>
            }
        </header>
    );
};