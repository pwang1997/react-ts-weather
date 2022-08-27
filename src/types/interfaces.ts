export interface ILocation {
    latitude : number,
    longitude : number,
    alias?: string
}

export interface IWeather {
    time : number | string,
    temperature : number,
    icon ?: string
}