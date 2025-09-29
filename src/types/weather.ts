export interface WeatherData {
    name: string;
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
        pressure: number;
        temp_min: number;
        temp_max: number;
    };
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
    dt: number; 
    sys: {
        country: string;
    };
}

export interface ForecastData {
    list: ForecastItem[]; 
    city: {
        name: string;
        country: string;
    };
}

export interface ForecastItem {
    dt: number;
    main: {
        temp: number;
        humidity: number;
        pressure: number;
    };
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
    dt_txt: string;
}