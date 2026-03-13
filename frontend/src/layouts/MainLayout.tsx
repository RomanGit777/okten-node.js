import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";

export const MainLayout = () => {
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    );
};