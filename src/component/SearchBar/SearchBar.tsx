import React, {FC, useState} from "react";
import {Button, TextField} from "@mui/material";
import axios from "axios";

import './styles.css';
import {ILocation} from "../../types/interfaces";
import useDebounce from "../../hook/CmHook";

interface IProps {
    onUpdateLocationList : (loc: ILocation) =>  void;
}

const SearchBar: FC<IProps> = ({onUpdateLocationList} : IProps) => {

    const [location, setLocation] = useState<null | ILocation>(null);
    const [debouncedCity, city, setCity] = useDebounce<string>("", 500);
    const [data, setData] = useState<string[]>([]);

    const handleSearch = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const newCity = e.target.value;
        setCity(newCity);
        if(!Boolean(debouncedCity)) {
            return;
        }
        const fetch_city_api = `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.REACT_APP_GOOGLE_GEOLOCATION_API}&address=${newCity}`;
        axios.get(fetch_city_api)
            .then(res => {
                if(res.data.length !== 0) {
                    const result = res.data.results[0];

                    setLocation({
                        latitude : result.geometry.location.lat,
                        longitude : result.geometry.location.lng
                    });
                    setData([...data, result.formatted_addresss]);
                    console.log(result);
                }
            })
            .catch(err => {
                console.warn(`ERROR(${err.code}): ${err.message}`);
            });
    }

    const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
        if(location !== null) {
            onUpdateLocationList(location as ILocation);
            setCity("");
            setLocation(null);
        }
        event.preventDefault();
    }
    return (
        <div className="search-container">
            <TextField
                id="search-input"
                className="search-input"
                label="search"
                value={city}
                onChange={handleSearch}
            />
            <Button type="submit"
                    variant="contained"
                    onClick={handleSubmit}>Search</Button>
        </div>
    );
}
export default SearchBar;