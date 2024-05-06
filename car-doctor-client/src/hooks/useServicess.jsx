import { useEffect, useState } from "react";

const useServicess = () => {
    const [servicess, setServicess] = useState([]);

    useEffect( ()=> {
        fetch('https://car-doctor-server-one-plum.vercel.app/servicess')
        .then(res => res.json())
        .then(data => setServicess(data))
    },[])
    return servicess;
};

export default useServicess;