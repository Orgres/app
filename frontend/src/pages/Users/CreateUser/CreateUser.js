import {
    Button,
    Form,
    Input,
    Message,
} from 'semantic-ui-react';
import React, { useState, useEffect } from "react";
import Control from "../../../components/Control/Control";
import { getRoles, createUser } from '../../../API/users';
import './CreateUser.css';

export const CreateUser = (props) => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [middlename, setMiddlename] = useState('');
    const [login, setLogin] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [role_id, setRoleId] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [options, setOptions] = useState([]);

    const setDefaults = () => {
        setFirstname('');
        setMiddlename('');
        setLastname('');
        setLogin('');
        setPassword1('');
        setPassword2('');
        setRoleId('');
        setError('');
    };

    useEffect(() => {
        setSuccess(false);
    }, [firstname, lastname, middlename, login]);

    useEffect(() => {
        getRoles()
            .then((roles) => {
                setOptions(roles.map(item => ({ key: item.id, value: item.id, text: item.name })));
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);


    const controlls = [
        { name: Input, value: lastname, type: 'text', label: 'Фамилия', placeholder: 'не указана', onChangeHandler: event => setLastname(event.target.value.trim()) },
        { name: Input, value: firstname, type: 'text', label: 'Имя', placeholder: 'не указано', onChangeHandler: event => setFirstname(event.target.value.trim()) },
        { name: Input, value: middlename, type: 'text', label: 'Отчество', placeholder: 'не указано', onChangeHandler: event => setMiddlename(event.target.value.trim()) },
        { name: Input, value: login, type: 'text', label: 'Логин', placeholder: 'не указан', onChangeHandler: event => setLogin(event.target.value.trim()) },
        { name: Input, value: password1, type: 'password', autocomplete: "true", label: 'Пароль', placeholder: 'не указан', onChangeHandler: event => setPassword1(event.target.value.trim()) },
        { name: Input, value: password2, type: 'password', autocomplete: "true", label: 'Подтверждение пароля', placeholder: 'не указан', onChangeHandler: event => setPassword2(event.target.value.trim()) },
    ];

    const addUser = () => {
        const password = password2;
        let newUser = {
            firstname,
            middlename,
            lastname,
            login,
            password,
            role_id,
        };

        let isFormValid = true;
        Object.keys(newUser).forEach(key => {
            isFormValid = newUser[key] && isFormValid;
        });

        if (isFormValid) {
            if (password1.length < 6) {
                setError('Пароль должен состоять не менее чем из 6 символов');
                return
            };
            if (password1 !== password2) {
                setError('Пароли не совпадают');
                return
            };

            setError('');

            createUser(newUser)
                .then((user) => {
                    setDefaults();
                    setSuccess(true);
                    props.save(user)
                })
                .catch((error) => {
                    setError(`Ошибка добавления пользователя ${error.message}`);
                })

        } else {
            setError('Заполните все поля');
        };
    };

    return (
        <div className="modal">
            <div className="container" >
                <Form>
                    <Form.Field className={"cancel__buttom"} color="red" control={Button} onClick={props.cancel} >Закрыть</Form.Field>
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
                    <Form.Dropdown
                        selection
                        label="Роль пользователя"
                        options={options}
                        placeholder="не указана"
                        value={role_id}
                        onChange={(event, data) => {
                            setRoleId(data.value)
                        }}
                    />
                    {
                        error
                            ?
                            <Message negative>
                                <Message.Header>{error}</Message.Header>
                            </Message>
                            :
                            null
                    }
                    {
                        success
                            ?
                            <Message positive>
                                <Message.Header>Пользователь зарегистрирован!</Message.Header>
                            </Message>
                            :
                            null
                    }
                    <Form.Field color="green" control={Button} onClick={addUser} >Зарегистрировать пользователя</Form.Field>
                </Form>
            </div>
        </div>
    );
};
