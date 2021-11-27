import React from 'react';
import { Form } from 'semantic-ui-react';

const Control = ({ attributes }) => {
    return (
        <Form.Field
            value={attributes.value}
            control={attributes.name}
            type={attributes.type}
            label={attributes.label}
            placeholder={attributes.placeholder}
            onChange={attributes.onChangeHandler}
            autoComplete={attributes.autocomplete}
        />
    );
};

export default Control;
