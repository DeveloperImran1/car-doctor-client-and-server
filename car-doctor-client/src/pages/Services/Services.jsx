import { useEffect, useState } from "react";
import ServicesCard from "./ServicesCard";

const Services = () => {
    const [services, setServices] = useState([]);
    
    useEffect( ()=> {
        fetch("http://localhost:5000/servicess")
        .then(res => res.json())
        .then(data => {
            setServices(data)
        })
    } ,[])
    return (
        <div>
            <h1 className="text-5xl text-center" >Our all services: {services.length} </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" >
                {
                    services.map(service => <ServicesCard key={service._id} service={service} ></ServicesCard> )
                }
            </div>
        </div>
    );
};

export default Services;