import React, {useState} from 'react';
import './App.css';
import SearchBar from "./component/SearchBar/SearchBar";
import WeatherContent from "./component/WeatherContent/WeatherContent";
import {ILocation} from "./types/interfaces";

function App() {
    const [locationList, setLocationList] = useState<ILocation[]>([]);

    const onUpdateLocationList = (location: ILocation) => {
        setLocationList([...locationList, location]);
        console.log(locationList);
    }

    return (
        <div className="App">
            <div>
                <SearchBar onUpdateLocationList={onUpdateLocationList}/>
            </div>

            <div>
                <WeatherContent />
            </div>
        </div>
    );
}

export default App;
