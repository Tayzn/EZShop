import React from "react";
import "./App.css";
import { Filter } from "./components/Filter";
import { AuthComponent } from "./components/AuthComponent";
import { TempDataComponent } from "./components/TempDataComponent";
function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                UD CISC275 Team 4 Final Project
                <AuthComponent></AuthComponent>
            </header>
            <h1>Team Members:</h1>
            <p>Tyler Nauta</p>
            <p>Paul Kearney</p>
            {<Filter></Filter>}
            <p>Matt Meredith</p>
            <TempDataComponent />
            <p>Nick Lago</p>
            <p>Evan Lewis</p>
            <p>Kay Sousa</p>
        </div>
    );
}

export default App;
