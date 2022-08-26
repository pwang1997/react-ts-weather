import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import * as React from "react";
import {ILocation} from "../../../types/interfaces";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";


interface IProps {
    location: ILocation;
}

export default function WeatherCard({location}: IProps) {
    const [forecastList, setForecastList] = useState();
    const [tempList, setTempList] = useState(Array());
    const [expanded, setExpanded] = useState<string | false>(false);
    const [city, setCity] = useState();

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    useEffect(() => {
        const count = 2;
        const fetch_weather_url = `https://api.openweathermap.org/data/2.5/forecast?units=metric&cnt=${count}&lat=${location.latitude}&lon=${location.longitude}&appid=${process.env.REACT_APP_WEATHER_API}`;
        const fetch_city_url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude}, ${location.longitude}&result_type=locality&key=${process.env.REACT_APP_GOOGLE_GEOLOCATION_API}`;

        const reqFetchWeather = axios.get(fetch_weather_url);
        const resFetchWeather = (res: AxiosResponse) => {
            const data = res.data.list;
            setForecastList(data);

            let forecastList = Array<any>();
            for (const forecast of data) {
                forecastList = [...forecastList, {
                    time: forecast.dt_txt,
                    temp: forecast.main.temp
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
        <Card className="center">
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
                {
                    tempList.map((data, idx) => {
                        return (
                            <Accordion key={idx} expanded={expanded === `panel${idx}`}
                                       onChange={handleChange(`panel${idx}`)}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls={`panel1bh-content-${idx}`}
                                    id={`panel1bh-header-${idx}`}
                                >
                                    <Typography>
                                        {data.time}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Temperature : {data.temp}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        );
                    })
                }

            </CardContent>
        </Card>
    );
}