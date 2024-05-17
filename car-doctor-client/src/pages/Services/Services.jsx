import { useEffect, useState } from "react";
import ServicesCard from "./ServicesCard";
import useServicess from "../../hooks/useServicess";

const Services = () => {
    // custom hook use korbo
    const [asc, setAsc] = useState(true);
    const [minimum, setMinimum] = useState(undefined)
    const [maximum, setMaximum] = useState(undefined)
    const [search, setSearch] = useState("");
    const services = useServicess(asc, minimum, maximum, search);
    
    const handlePriceRange = (e) => {
        e.preventDefault();
        setMinimum(parseInt(e.target.minimum.value))
        setMaximum(parseInt(e.target.maximum.value))
    }
  
    const handleSearch = e => {
        e.preventDefault();
        const searchText = e.target.search.value;
        setSearch(searchText)
    }
    console.log(search)

    // normal fetch koresi aikhane
    // const [services, setServices] = useState([]);

    // useEffect( ()=> {
    //     fetch("https://car-doctor-server-one-plum.vercel.app/servicess?sort=${asc? 'asc':'des'}")
    //     .then(res => res.json())
    //     .then(data => {
    //         setServices(data)
    //     })
    // } ,[])
    return (
        <div>
            <h1 className="text-5xl text-center" >Our all services: {services.length} </h1>

            <button onClick={() => setAsc(!asc)} className="btn btn-secondary" > {asc ? 'Price: High to Low' : 'Price Low to High'} </button>
            <form onSubmit={handleSearch}>
                <input className="p-4 border-2" id="search" placeholder="Search Now" type="text" name="search" />
                <button className="btn btn-secondary" type="submit" > Search</button>
            </form>
            <form onSubmit={handlePriceRange}>
                <input className="p-4 border-2" id="minimum" placeholder="Minimum Price" type="number" name="minimum" />
                <input className="p-4 border-2" id="maximum" placeholder="Maximum Price" type="number" name="maximum" />
                <button className="btn btn-secondary" type="submit" > Submit</button>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" >
                {
                    services.map(service => <ServicesCard key={service._id} service={service} ></ServicesCard>)
                }
            </div>
        </div>
    );
};

export default Services;