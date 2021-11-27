import { useState } from "react";

const fakeAuth = {
    isAuthenticated: false,
    signin(cb) {
        fakeAuth.isAuthenticated = true;
        cb()
    },
    signout(cb) {
        fakeAuth.isAuthenticated = false;
        cb()
    }
};

export function useProvideAuth() {
    const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));

    const signin = (cb) => {
        return fakeAuth.signin(() => {
            cb()
                .then((args) => {
                    const token = args.responseData.token;
                    const userRole = args.responseData.role_id === 1 ? 'Admin' : 'User';

                    localStorage.setItem('token', token);
                    localStorage.setItem('userRole', userRole);

                    setIsAuth(true);
                    args.history.replace(args.from);
                })
                .catch(e => {
                    console.log(e);
                });
        });
    };

    const signout = (cb) => {
        return fakeAuth.signout(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('userRole');
            setIsAuth(false);
            cb();
        });
    };

    return {
        isAuth,
        signin,
        signout
    };
};
