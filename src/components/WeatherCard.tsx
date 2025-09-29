import { WeatherData } from '@/types/weather';
import WeatherIcon from './WeatherIcon';
import { formatTemperature, formatDate, capitalizeFirst } from '@/utils/weatherFormatters';

interface WeatherCardProps {
    data: WeatherData;
}

export default function WeatherCard({ data }: WeatherCardProps) {
    return (
        <div className="weather-card-container weather-card-bg super-cool-card border-glow">
            {/* Header con ciudad y fecha */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div className="mb-4 md:mb-0">
                    <h2 className="text-3xl font-bold text-blue-900">{data.name}</h2>
                    <p className="text-blue-800 text-lg">{formatDate(data.dt)}</p>
                </div>
                <div className="text-center md:text-right">
                    <div className="flex items-center justify-center md:justify-end space-x-3">
                        <WeatherIcon 
                            icon={data.weather[0].icon} 
                            description={data.weather[0].description} 
                            size="large" 
                        />
                        <div>
                            <p className="text-xl font-semibold text-blue-900 capitalize">
                                {capitalizeFirst(data.weather[0].description)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Temperatura principal */}
            <div className="weather-card-item text-center py-6 mb-6">
                <p className="text-7xl font-bold text-blue-900">
                    {formatTemperature(data.main.temp)}
                </p>
                <p className="text-blue-800 mt-2 font-medium">Temperatura actual</p>
            </div>

            {/* Grid de detalles */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="weather-card-item p-4 text-center">
                    <div className="text-blue-700 text-2xl mb-2">💧</div>
                    <p className="text-blue-800 text-sm font-medium">Humedad</p>
                    <p className="text-blue-900 text-xl font-bold">{data.main.humidity}%</p>
                </div>
                
                <div className="weather-card-item p-4 text-center">
                    <div className="text-blue-700 text-2xl mb-2">💨</div>
                    <p className="text-blue-800 text-sm font-medium">Viento</p>
                    <p className="text-blue-900 text-xl font-bold">{data.wind.speed} m/s</p>
                </div>
                
                <div className="weather-card-item p-4 text-center">
                    <div className="text-blue-700 text-2xl mb-2">🌡️</div>
                    <p className="text-blue-800 text-sm font-medium">Sensación</p>
                    <p className="text-blue-900 text-xl font-bold">{formatTemperature(data.main.feels_like)}</p>
                </div>
                
                <div className="weather-card-item p-4 text-center">
                    <div className="text-blue-700 text-2xl mb-2">📊</div>
                    <p className="text-blue-800 text-sm font-medium">Presión</p>
                    <p className="text-blue-900 text-xl font-bold">{data.main.pressure} hPa</p>
                </div>
            </div>
        </div>
    );
}