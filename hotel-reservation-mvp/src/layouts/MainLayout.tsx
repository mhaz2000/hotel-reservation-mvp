import { Outlet } from "react-router-dom";
import MainNavbar from "./MainNavbar";

const MainLayout = () => {

    return (
        <div id="app">
            <MainNavbar />
            <Outlet />
        </div>
    );
};

export default MainLayout;


