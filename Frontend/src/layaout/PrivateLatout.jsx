import { Outlet } from "react-router-dom";
import { NavBar } from "../components/Navbar";
import { SideBar } from "../components/Sidebar";

export function PrivateLatout() {

    return (
        <>
            <NavBar />
            <SideBar />
            <Outlet />
        </>
    )
}