import { useEffect, useState, useContext, createContext } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import {auth} from "../Firebase";
//import { NavLink } from "react-bootstrap";

 const  userAuthContext = createContext({
        user: null,
        logIn: () => {},
        logOut: () => {},
 });

const USER = { name: "Guest", isGuestUser: true };


export function UserAuthContextProvider({children}) {
    const [user, setUser] = useState(USER);
    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    function logIn(email, password) {
    setUser({ isGuestUser: false, name: email });
        return signInWithEmailAndPassword(auth, email, password);
    }
    function logOut () {
        setUser(USER);
        return signOut(auth);
    }
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
        setUser(currentUser);
    })
    //cleanup function
    return () => {
        unsubscribe();
    }
    }, []);
    return(
        <userAuthContext.Provider value={{user, signUp, logIn, logOut}}>
            {children}
        </userAuthContext.Provider>
    )
}
export function useUserAuth(){
   return  useContext(userAuthContext)
}