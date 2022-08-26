import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import * as React from "react";
import {ILocation} from "../../../types/interfaces";
import {useEffect, useState} from "react";
import axios from "axios";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";


interface IProps {
    location: ILocation;
}

export default function WeatherCard({location}: IProps) {
    const [forecastList, setForecastList] = useState();
    const [tempList, setTempList] = useState(Array());
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    useEffect(() => {
        const count = 2;
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?units=metric&cnt=${count}&lat=${location.latitude}&lon=${location.longitude}&appid=${process.env.REACT_APP_WEATHER_API}`)
            .then(res => {
                const data = res.data.list;
                setForecastList(data);

                for (const forecast of data) {
                    setTempList([...tempList, {
                        time: forecast.dt_txt,
                        temp: forecast.main.temp,
                        rain_chance: (Object.values(forecast.rain)[0] as number) * 100 + "%"
                    }]);
                }
            })
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
                                    <Typography>
                                        Raining Chance: {data.rain_chance}
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