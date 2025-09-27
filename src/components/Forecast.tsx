import { ForecastData } from '@/types/weather';
import WeatherIcon from './WeatherIcon';
import { formatTemperature, formatDate, formatTime } from '@/utils/weatherFormatters';

interface ForecastProps {
  data: ForecastData;
}

export default function Forecast({ data }: ForecastProps) {
  // Agrupar por día y tomar el primer registro de cada día
  const dailyForecast = data.list.filter((item, index) => index % 8 === 0);

  return (
    <div className="weather-card bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8">
      <h3 className="text-2xl font-bold text-blue-900 mb-6">
        Pronóstico 5 días - {data.city.name}, {data.city.country}
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 forecast-grid">
        {dailyForecast.map((day) => (
          <div key={day.dt} className="forecast-item text-center p-4 rounded-xl bg-white/80 hover:bg-white/95 transition-all">
            <p className="font-semibold text-blue-800 text-sm mb-3">
              {formatDate(day.dt).split(',')[0]}
            </p>
            
            <WeatherIcon 
              icon={day.weather[0].icon} 
              description={day.weather[0].description}
              size="small"
            />
            
            <p className="text-xl font-bold text-gray-800 mt-2">
              {formatTemperature(day.main.temp)}
            </p>
            
            <p className="text-sm text-gray-600 capitalize mb-2">
              {day.weather[0].description}
            </p>
            
            <div className="text-xs text-gray-500 space-y-1">
              <p>💧 {day.main.humidity}%</p>
              <p>💨 {day.wind.speed} m/s</p>
            </div>
            
            <p className="text-xs text-gray-400 mt-2">
              {formatTime(day.dt)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}