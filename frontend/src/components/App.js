import React, { Component } from 'react';
import { render } from "react-dom";
import HomePAge from './HomePage'


export default class App extends Component {
    constructor(props){
        super(props);

    }

    render(){
        return (
        <div className="center">
            <HomePAge/>
        </div>
        );
    }
}

const appDiv = document.getElementById("app");
render(<App name="lucas"/>, appDiv)