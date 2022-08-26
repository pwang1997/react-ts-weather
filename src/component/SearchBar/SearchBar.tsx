import * as React from 'react';
import {useState} from "react";
// import {ILocation} from "../../types/interfaces";

export default function CustomizedInputBase() {
    // const [location, setLocation] = useState<null | ILocation>(null);

    const [city, setCity] = useState<null | string>(null);

    const handleSearchBar = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setCity(e.target.value);
    }

    return (
       <form>
           <input type={"search"} onChange={handleSearchBar}/>
       </form>
    );
}
