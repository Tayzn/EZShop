import React from "react";
import "./App.css";
import { Filter } from "./components/Filter";
function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                UD CISC275 Team 4 Final Project
            </header>
            <h1>Team Members:</h1>
            <p>Tyler Nauta</p>
            <p>Paul Kearney</p>
            {<Filter></Filter>}
            <p>Matt Meredith</p>
            <p>Nick Lago</p>
            <p>Evan Lewis</p>
            <p>Kay Sousa</p>
        </div>
    );
}

export default App;
