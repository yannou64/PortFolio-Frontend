import { createContext } from "react";

// Contexte créé pour pouvoir consulter et modifier la valeur de AuthContext dans header 
const AuthContext = createContext({
    isAdmin: false,
    setIsAdmin: ()=>{}
});

export default AuthContext;
