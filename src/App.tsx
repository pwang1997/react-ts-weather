import React from 'react';
import './App.css';
import CustomizedInputBase from "./component/SearchBar/SearchBar";
import WeatherContent from "./component/WeatherContent/WeatherContent";

function App() {
    return (
        <div className="App">
            <div>
                <CustomizedInputBase />
            </div>

            <div>
                <WeatherContent />
            </div>
        </div>
    );
}

export default App;
