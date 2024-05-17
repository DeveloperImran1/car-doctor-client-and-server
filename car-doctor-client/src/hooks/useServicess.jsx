import { useEffect, useState } from "react";
import { axiosSecure } from "./useAxiosSecure";

const useServicess = (asc, minimum, maximum, search) => {
    const [servicess, setServicess] = useState([]);
// useEffext er dependency hisabe asc k dibo,, otherwise asecending or descending button a click korle aikhane aslew useEffect call hobena.
    useEffect( ()=> {
        // aikhane custom hook create kore normaly fetch koresi. But aikhane axiosSecure use korar jonno nicher way folow now;
        // fetch(`https://car-doctor-server-one-plum.vercel.app/servicess?sort=${asc?'asc':'des'}`)
        // .then(res => res.json())
        // .then(data => setServicess(data))

        axiosSecure(`/servicess?sort=${asc ? 'asc': 'des'}&minimum=${minimum}&maximum=${maximum}&search=${search}`)
        .then(res => setServicess(res.data))
    },[asc, minimum, maximum, search])
    return servicess;
};

export default useServicess;