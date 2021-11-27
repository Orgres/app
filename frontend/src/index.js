import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.js";
import { useProvideAuth } from "./context/provide/auth.provide.js";
import { authContext } from "./context/auth.context.js";

function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

ReactDOM.render(
    <ProvideAuth>
        <Router>
            <App />
        </Router>
    </ProvideAuth>
    ,
    document.getElementById("root")
);
