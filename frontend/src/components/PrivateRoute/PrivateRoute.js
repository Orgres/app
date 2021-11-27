import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import {
    Dimmer,
    Loader
} from 'semantic-ui-react';
import { getRole } from '../../API/auth'

const Role = 'Admin';

const PrivateRoute = ({ children, ...rest }) => {

    const [loading, setLoading] = useState({ status: true, role: '' });

    useEffect(() => {
        getRole()
            .then((data) => {
                return data.role
            })
            .catch(() => {
                return '';
            })
            .then((role) => {
                setLoading({ status: false, role })
            });
    }, [])

    if (loading.status)
        return (
            <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
            </Dimmer>)

    return (
        <Route
            {...rest}
            component={() => {
                if (loading.role === Role) {
                    return children;
                } else {
                    return (
                        <Redirect
                            to='/auth'
                        />
                    );
                };
            }}
        />
    );
};

export default PrivateRoute;
