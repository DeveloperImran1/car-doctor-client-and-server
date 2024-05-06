import { createContext, useEffect, useState } from "react";
import app from "../firebase/Firebase";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import axios from "axios";
const auth = getAuth(app);
export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const singnIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currenttUser => {
            const userEmail = currenttUser?.email || user?.email;
            const loggedUser = {email: userEmail};

            setUser(currenttUser)
            console.log("Current user is", currenttUser)
            setLoading(false)

            // if user exist then issue a token
            if(currenttUser){
                axios.post('https://car-doctor-server-one-plum.vercel.app/jwt', loggedUser, {withCredentials:true})
                .then(res => {
                    console.log("Token responce", res.data)
                })
            }
            else{
                axios.post('https://car-doctor-server-one-plum.vercel.app/logout', loggedUser, {withCredentials: true})
                .then(res => {
                    console.log(res.data)
                })
            }
        })
        return () => {
            return unSubscribe()
        }
    }, [])



    const authInfo = {
        user, loading, createUser, logOut, singnIn
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;