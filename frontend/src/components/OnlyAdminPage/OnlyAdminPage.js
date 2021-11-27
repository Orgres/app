import React from "react"
import { Message } from "semantic-ui-react"

const OnlyAdmin = ({ children, ...rest }) => {
    if (localStorage.getItem('userRole') === 'Admin') {
        return children
    } else {
        return <Message negative>Только админ может добавлять пользователей</Message>
    };
};

export default OnlyAdmin;