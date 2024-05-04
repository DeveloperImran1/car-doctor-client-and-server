import { useContext } from "react";
import { AuthContext } from "../pages/Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    console.log(location)
    if (loading) {
        return <p>Loading...........</p>
    }
    if (user) {
        return children;
    }
    return <Navigate to='/login' ></Navigate>
};

export default PrivateRoute;