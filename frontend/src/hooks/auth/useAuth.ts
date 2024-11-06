import { useState } from "react";
import { useNavigate } from "react-router-dom";
import paths from "@/configs/paths";
import { AsyncLocalStorage } from "async_hooks";

const useAuth = () => {
    const [ token, setToken ] = useState<string>('');
    const navigate = useNavigate();

    const goSignupPage = () => {
        navigate(paths.auth.signUp)
    }

    const goSignInPage = () => {
        navigate(paths.auth.signIn)
    }
    
    const goLogout = () => {
        localStorage.removeItem('jwtToken');
        navigate(paths.auth.signIn)
    }

    const getStoredToken = (): string | null => {
        const storedToken = localStorage.getItem('jwtToken');
        if (storedToken) {
            setToken(storedToken);
        }
        return storedToken;
    };

    return {
        token,
        goSignupPage,
        goSignInPage,
        goLogout,
        getStoredToken
    }
}

export default useAuth;