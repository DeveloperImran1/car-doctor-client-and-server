import { Outlet } from "react-router-dom";
import Footer from "../../shared/Footer";
import Navbar from "../../pages/Navbar/Navbar";

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;