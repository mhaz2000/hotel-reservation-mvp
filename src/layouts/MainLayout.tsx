import { Outlet } from "react-router-dom";
import MainNavbar from "./MainNavbar";

const MainLayout = () => {

    return (
        <>
            <MainNavbar />
            <Outlet />
        </>
    );
};

export default MainLayout;


