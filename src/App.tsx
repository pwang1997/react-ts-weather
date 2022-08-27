import React, {useEffect, useState} from 'react';
import './App.css';
import SearchBar from "./component/SearchBar/SearchBar";
import WeatherContent from "./component/WeatherContent/WeatherContent";
import {ILocation} from "./types/interfaces";
import Typography from "@mui/material/Typography";

function App() {
    const [locationList, setLocationList] = useState<ILocation[]>([]);
    const onUpdateLocationList = (location: ILocation) => {
        setLocationList([...locationList, location]);
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const coord = pos.coords;

            setLocationList([...locationList, {
                latitude: coord.latitude,
                longitude: coord.longitude
            }]);

        }, (err) => {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }, {});
    }, []);

    return (
        <div className="App">
            <Typography
                align={"center"}
                variant={"h1"}>
                Simple Weather App
            </Typography>
            <div>
                <SearchBar onUpdateLocationList={onUpdateLocationList}/>
            </div>

            <div>
                <WeatherContent locationList={locationList}/>
            </div>
        </div>
    );
}

export default App;
