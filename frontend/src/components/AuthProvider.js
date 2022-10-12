import AuthContext from "./AuthContext";
import { useState } from "react";

const AuthProvider = ({ children }) => {
    const [status, setStatus] = useState('not valid');

    const setValid = () => setStatus('valid');

    const setNotValid = () => setStatus('not valid')

    return (
        <AuthContext.Provider value={{ status, setValid, setNotValid }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;