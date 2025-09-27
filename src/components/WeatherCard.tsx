import { WeatherData } from '@/types/weather';
import WeatherIcon from './WeatherIcon';
import { formatTemperature, formatDate, capitalizeFirst } from '@/utils/weatherFormatters';

interface WeatherCardProps {
  data: WeatherData;
}

export default function WeatherCard({ data }: WeatherCardProps) {
  return (
    <div className="weather-card bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 mb-8">
      {/* Encabezado con ciudad y fecha */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-blue-900">{data.name}</h2>
          <p className="text-gray-600 text-lg">{formatDate(data.dt)}</p>
        </div>
        <div className="text-right">
          <WeatherIcon 
            icon={data.weather[0].icon}
            description={data.weather[0].description}
            size="large"
          />
          <p className="text-gray-700 font-medium capitalize mt-2">
            {capitalizeFirst(data.weather[0].description)}
          </p>
        </div>
      </div>

      {/* Datos principales del clima */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <div className="text-center">
          <p className="text-5xl font-bold text-blue-800">{formatTemperature(data.main.temp)}</p>
          <p className="text-gray-600 text-sm mt-2">Temperatura</p>
        </div>

        <div className="text-center">
          <p className="text-2xl font-semibold text-gray-800">{data.main.humidity}%</p>
          <p className="text-gray-600 text-sm mt-2">Humedad</p>
        </div>

        <div className="text-center">
          <p className="text-2xl font-semibold text-gray-800">{data.wind.speed} m/s</p>
          <p className="text-gray-600 text-sm mt-2">Viento</p>
        </div>

        <div className="text-center">
          <p className="text-2xl font-semibold text-gray-800">{data.main.pressure} hPa</p>
          <p className="text-gray-600 text-sm mt-2">Presión</p>
        </div>
      </div>

      {/* Datos adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">
            Sensación: {formatTemperature(data.main.feels_like)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">
            Min: {formatTemperature(data.main.temp_min)} / Max: {formatTemperature(data.main.temp_max)}
          </p>
        </div>
      </div>
    </div>
  );
}