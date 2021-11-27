import React, { useEffect, useState } from "react";
import { getUsers } from '../../API/users'
import {
    Table,
    Button
} from 'semantic-ui-react';
import CreateUser from './CreateUser';
import './user.css';

export const Users = () => {

    const [users, setUsers] = useState([]);
    const [modalStatus, setModalStatus] = useState(false);

    useEffect(() => {
        getUsers().then((users) => {
            setUsers(users)
        })
    }, [])

    const addUser = (user) => {
        setUsers([...users, user]);
    }

    return (
        <div className={"users__list"}>
            <Button onClick={() => setModalStatus(true)} color="green">Добавить</Button>
            {
                modalStatus ? <CreateUser save={addUser} cancel={() => setModalStatus(false)} /> : null
            }
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign="center" >ФИО</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center" >Логин</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center" >Роль</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        users.map((user, index) => (
                            <Table.Row key={index}>
                                <Table.Cell>
                                    {
                                        `${user.lastname} ${user.firstname} ${user.middlename}`
                                    }
                                </Table.Cell>
                                <Table.Cell >
                                    {
                                        user.login
                                    }
                                </Table.Cell>
                                <Table.Cell >
                                    {
                                        user.Role.name
                                    }
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
        </div>
    )
}
