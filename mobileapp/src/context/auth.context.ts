import { createContext } from "react";

export type AuthContext = {
    auth: boolean,
    signin: (token: string) => void,
    signout: () => void,
}

const authContext = createContext<AuthContext | undefined>(undefined);

export { authContext }
