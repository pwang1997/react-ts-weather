import * as React from 'react';

import './styles.css';
import {ILocation} from "../../types/interfaces";
import WeatherCard from "./WeatherCard/WeatherCard";

interface IProps {
    locationList : ILocation[]
}

export default function WeatherContent({locationList} : IProps) {
    return (
        <div className="weather-container">
            {
                locationList.map((loc, idx) => {
                    return <WeatherCard key={idx} location={loc}/>
                })
            }
        </div>

    );
}
