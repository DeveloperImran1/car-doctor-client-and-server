import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const CheckOut = () => {
    const service = useLoaderData();
    const {title, _id, price, img} = service;

    const {user} = useContext(AuthContext)
    console.log(user)
    console.log(service)
    const handleSubmit = (e)=> {
        e.preventDefault();
        const name = user?.displayName;
        const email = user?.email;
        const date = e.target.date.value;

        const booking = {
            customerName : name,
            email, date, service: title, img, service_id: _id, price
        }
        console.log(booking)

        fetch("https://car-doctor-server-one-plum.vercel.app/bookings" ,{
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }
    return (
        <div>
            <h2>Checked Out: {service.title} </h2>
            <form  onSubmit={handleSubmit} className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" >
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email"  defaultValue={user?.email} placeholder="email"  name="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" placeholder="date"  name="date" className="input input-bordered" required />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" >
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" defaultValue={user?.displayName} placeholder="Name"  name="name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Service</span>
                        </label>
                        <input type="service" placeholder="service" name="service" className="input input-bordered" required />
                    </div>
                </div>

                <div className="form-control mt-6">
                    <button className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default CheckOut;