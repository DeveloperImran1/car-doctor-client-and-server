import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'https://car-doctor-server-one-plum.vercel.app',
    withCredentials: true
})


const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, error => {
            console.log("error tracked in the intercepter", error.response)
            if (error.response.status === 401 || error.response.status === 403) {
                console.log("LogOut koro user k")
                logOut()
                .then(() => {
                    navigate("/login")
                })
                .catch(err => console.log(err))
            }
        })
    }, [])


    return axiosSecure;
};

export default useAxiosSecure;