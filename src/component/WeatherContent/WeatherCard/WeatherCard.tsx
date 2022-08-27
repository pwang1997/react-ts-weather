import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import * as React from "react";
import {ILocation, IWeather} from "../../../types/interfaces";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";

import {CartesianGrid, LineChart, YAxis, XAxis, Line, Tooltip} from "recharts";
import {CardMedia} from "@mui/material";

interface IProps {
    location: ILocation;
}

export default function WeatherCard({location}: IProps) {
    const [tempList, setTempList] = useState(Array<IWeather>());
    const [city, setCity] = useState();
    useEffect(() => {
        const count = 6;
        const fetch_weather_url = `https://api.openweathermap.org/data/2.5/forecast?units=metric&cnt=${count}&lat=${location.latitude}&lon=${location.longitude}&appid=${process.env.REACT_APP_WEATHER_API}`;
        const fetch_city_url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude}, ${location.longitude}&result_type=locality&key=${process.env.REACT_APP_GOOGLE_GEOLOCATION_API}`;

        const reqFetchWeather = axios.get(fetch_weather_url);
        const resFetchWeather = (res: AxiosResponse) => {
            const data = res.data.list;

            let forecastList = Array<IWeather>();
            for (const forecast of data) {
                forecastList = [...forecastList, {
                    time: forecast.dt_txt,
                    temperature: forecast.main.temp,
                    icon: forecast?.weather[0]?.icon
                }];
            }
            setTempList([...tempList, ...forecastList]);
        }

        const reqFetchCity = axios.get(fetch_city_url);
        const resFetchCity = (res: AxiosResponse) => {
            setCity(res.data.results[0].formatted_address);
        }

        axios.all([reqFetchWeather, reqFetchCity])
            .then(axios.spread((...res) => {
                // axios responses
                const resWeather = res[0];
                const resCity = res[1];
                // update States
                resFetchWeather(resWeather);
                resFetchCity(resCity);
            }))
            .catch(err => {
                console.log(`ERROR(${err.code}): ${err.message}`)
            });
    }, []);

    return (
        <div>
            <Card className="center">
                <CardMedia
                    component="img"
                    height="140"
                    image={`https://openweathermap.org/img/wn/${tempList[0]?.icon}.png`}
                    alt="weather image"
                    sx={{
                        height: 64,
                        width: 64
                    }}
                />
                <CardContent>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        Latitude: {
                        location?.latitude
                    }
                    </Typography>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        Longitude: {
                        location?.longitude
                    }
                    </Typography>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        Location: {
                        city
                    }
                    </Typography>
                </CardContent>
                <CardContent>
                    <LineChart width={400} height={300} data={tempList}>
                        <XAxis dataKey="time"/>
                        <YAxis/>
                        <Tooltip/>
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                        <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{r: 6}}/>
                    </LineChart>
                </CardContent>
            </Card>
        </div>
    );
}