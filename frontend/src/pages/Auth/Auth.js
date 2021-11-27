import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { useAuth } from "../../context/auth.context";

import Control from "../../components/Control/Control";
import { authenticate } from "../../API/auth";

import {
    Button,
    Form,
    Input,
} from 'semantic-ui-react';
import './Auth.css';



const Auth = () => {
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };

    const auth = useAuth();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const controlls = [
        { name: Input, value: login, type: 'text', label: 'Логин', placeholder: 'не указан', onChangeHandler: event => setLogin(event.target.value.trim()) },
        { name: Input, value: password, autocomplete: 'true', type: 'password', label: 'Пароль', placeholder: 'не указан', onChangeHandler: event => setPassword(event.target.value.trim()) },
    ];

    const onAuthHandler = () => {
        const data = { login, password };
        authenticate(auth, history, from, data);
    };

    return (
        <div className="Auth container">
            <Form>
                {
                    controlls.map((control, index) => {
                        return (
                            <Control
                                key={index}
                                attributes={control}
                            />
                        )
                    })
                }
                <Form.Field control={Button} onClick={onAuthHandler}>Войти</Form.Field>
            </Form>
        </div>
    );
};

export default Auth;
