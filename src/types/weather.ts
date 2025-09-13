export interface WeatherData {
    name: string;
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
        pressure: number;
        temp_min: number;
        temp_max: number;
    }

weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
}[];
wind: {
    speed: number;
    deg: number;
};

}

export interface ForecastData {
    dt: number;
    main: {
        temp: number;
        humidity: number;
    };
    weather:{
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    wind:{
        speed: number;
    };
    dt_txt: string;



}