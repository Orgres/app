import React from "react";
import { Button, Select } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { get } from './http';

const App = () => {

    const options = [
        { key: 1, value: 1, text: "Test" },
        { key: 2, value: 3, text: "Test1" }
    ]

    return (
        <div>
            <h1 className="test">My React App!</h1>
            <Button>Ok</Button>
            <Select
                onChange={(event) => { console.log(event.target.value) }}
                options={options}
            >
            </Select>
        </div>
    );
}

export default App;
