import React, { useState } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router';
import { Button } from "semantic-ui-react";
import { useAuth } from "../../context/auth.context";

const Navigation = props => {

    const location = useLocation();
    const [activeItem, setActiveItem] = useState(location.pathname);
    const onClickHandler = (e, { to }) => { setActiveItem(to) };

    let history = useHistory();
    let auth = useAuth();

    return (
        <Segment inverted>
            <Menu inverted pointing secondary>
                <Menu.Item
                    as={Link}
                    to='/'
                    name='Главная'
                    active={activeItem === '/'}
                    onClick={onClickHandler}
                />
                <Menu.Item
                    as={Link}
                    to='/adduser'
                    name='Пользователи'
                    active={activeItem === '/adduser'}
                    onClick={onClickHandler}
                />
                <Menu.Item
                    as={Link}
                    to='/pointpage'
                    name='Приборы учета'
                    active={activeItem === '/pointpage'}
                    onClick={onClickHandler}
                />
                <Menu.Menu position='right'>
                    <Button onClick={() => {
                        auth.signout(() => { history.push('/auth') })
                    }}>
                        Выйти
                    </Button>
                </Menu.Menu>
            </Menu>
        </Segment>
    )
}

export default Navigation;
