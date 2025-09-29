import { ForecastData, ForecastItem } from '@/types/weather';
import WeatherIcon from './WeatherIcon';
import { formatTemperature, formatDate } from '@/utils/weatherFormatters';

interface ForecastProps {
    data: ForecastData;
}

export default function Forecast({ data }: ForecastProps) {
    if (!data?.list || data.list.length === 0) {
        return (
            <div className="forecast-container forecast-blue-bg super-cool-card border-glow">
                <h3 className="text-2xl font-bold text-blue-900 text-center mb-6">
                    Pronóstico 5 Días
                </h3>
                <p className="text-blue-800 text-center">No hay datos de pronóstico disponibles</p>
            </div>
        );
    }

    const dailyForecast = data.list.filter((item: ForecastItem, index: number) => index % 8 === 0).slice(0, 5);

    return (
        <div className="forecast-container forecast-blue-bg super-cool-card border-glow">
            <h3 className="text-2xl font-bold text-blue-900 text-center mb-6">
                Pronóstico 5 Días - {data.city?.name}
            </h3>

            <div className="space-y-4">
                {dailyForecast.map((day: ForecastItem, index: number) => (
                    <div key={day.dt} className="forecast-item-bg flex items-center justify-between p-4 rounded-xl shadow-sm hover-lift scale-effect">
                        
                        <div className="w-32">
                            <p className="font-bold text-blue-900 text-lg">
                                {formatDate(day.dt).split(',')[0]}
                            </p>
                            <p className="text-blue-800 text-sm">
                                {new Date(day.dt * 1000).toLocaleDateString('es-ES', { 
                                    day: 'numeric', 
                                    month: 'short' 
                                })}
                            </p>
                        </div>

                        <div className="flex items-center space-x-3 w-40">
                            <WeatherIcon
                                icon={day.weather[0]?.icon || '01d'}
                                description={day.weather[0]?.description || 'Despejado'}
                                size="small"
                            />
                            <p className="text-blue-900 text-sm capitalize text-center font-medium">
                                {day.weather[0]?.description || 'Despejado'}
                            </p>
                        </div>

                        <div className="text-center w-20">
                            <p className="text-xl font-bold text-blue-900 glow-text">
                                {formatTemperature(day.main.temp)}
                            </p>
                        </div>

                        <div className="text-right w-32">
                            <div className="flex justify-between text-sm text-blue-900 mb-1">
                                <span className="font-medium">Humedad:</span>
                                <span className="font-semibold">{day.main.humidity}%</span>
                            </div>
                            <div className="flex justify-between text-sm text-blue-900">
                                <span className="font-medium">Viento:</span>
                                <span className="font-semibold">{day.wind.speed} m/s</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}