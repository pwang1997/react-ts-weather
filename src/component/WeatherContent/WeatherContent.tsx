import * as React from 'react';
import {useEffect, useState} from "react";

import './styles.css';
import {ILocation} from "../../types/interfaces";
import WeatherCard from "./WeatherCard/WeatherCard";

export default function WeatherContent() {
    const [locList, setLocList] = useState<ILocation[]>(Array<ILocation>);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const coord = pos.coords;

            setLocList([...locList, {
                latitude: coord.latitude,
                longitude: coord.longitude
            }]);

        }, (err) => {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }, {});
    }, []);

    return (
        <div className="weather-container">
            {
                locList.map((loc, idx) => {
                    return <WeatherCard key={idx} location={loc}/>
                })
            }
        </div>

    );
}
