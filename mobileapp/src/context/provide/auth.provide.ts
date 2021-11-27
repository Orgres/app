import { useState } from "react";

import { AuthContext } from '../';

const useProvideAuth = (): AuthContext => {
    const token = localStorage.getItem('token');
    const [auth, setAuth] = useState(!!token);

    const signin = (token: string) => {
        localStorage.setItem('token', token)
        setAuth(true);
    };

    const signout = () => {
        localStorage.removeItem('token');
        setAuth(false);
    };

    return {
        auth,
        signin,
        signout
    };
}

export { useProvideAuth }
