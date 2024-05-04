import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";

const Booking = () => {
    const { user } = useContext(AuthContext);
    const [booking, setBooking] = useState([]);

    const url = `http://localhost:5000/bookings?email=${user.email}`;
    useEffect(() => {
        // using axios
        axios.get(url, { withCredentials: true })
            .then(res => {
                console.log(res.data)
                setBooking(res.data)
            })



        // using fetch 
        // fetch(url)
        // .then(res => res.json())
        // .then(data => {
        //     console.log(data)
        //     setBooking(data)
        // })
    }, [url])
    console.log(booking)
    return (
        <div className="my-10" >
            <h1>Total Boking is: {booking.length}</h1>
        </div>
    );
};

export default Booking;