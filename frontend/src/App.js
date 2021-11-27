import React from "react";
import { Route, Switch } from 'react-router-dom'
import { useAuth } from "./context/auth.context";

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import Users from "./pages/Users";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import PointPage from "./pages/PointPage/PointPage";
import Navigation from "./components/Navigation/Navigation";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const App = () => {

    const auth = useAuth();

    return (
        <div className="App" >
            {
                auth.isAuth
                    ?
                    <Navigation />
                    :
                    null
            }

            <Switch>
                <Route path='/auth' component={Auth} />
                <PrivateRoute path="/" exact >
                    <Home />
                </PrivateRoute>
                <PrivateRoute path="/adduser">
                    {/* <OnlyAdmin> */}
                    <Users />
                    {/* </OnlyAdmin> */}
                </PrivateRoute>
                <PrivateRoute path='/pointpage'>
                    {/* <OnlyAdmin> */}
                    <PointPage />
                    {/* </OnlyAdmin> */}
                </PrivateRoute>
            </Switch>
        </div>
    );
};

export default App;
