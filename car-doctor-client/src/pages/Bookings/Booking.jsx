import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Booking = () => {
    const { user } = useContext(AuthContext);
    const [booking, setBooking] = useState([]);

    // const url = `https://car-doctor-server-one-plum.vercel.app/bookings?email=${user.email}`;
    // useEffect(() => {
    //     // using axios
    //     axios.get(url, { withCredentials: true })
    //         .then(res => {
    //             console.log(res.data)
    //             setBooking(res.data)
    //         })



    //     // using fetch 
    //     // fetch(url)
    //     // .then(res => res.json())
    //     // .then(data => {
    //     //     console.log(data)
    //     //     setBooking(data)
    //     // })
    // }, [url])


// use Costom hook for data fetching
const axiosSecure = useAxiosSecure()
const url = `/bookings?email=${user.email}` ;

useEffect(  ()=> {
    axiosSecure.get(url)
    .then(res => setBooking(res.data))
},[url, axiosSecure])

    return (
        <div className="my-10" >
            <h1>Total Boking is: {booking.length}</h1>
        </div>
    );
};

export default Booking;