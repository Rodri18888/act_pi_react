import { WeatherData } from '@/types/weather';
import WeatherIcon from './WeatherIcon';
import { formatTemperature, formatDate, capitalizeFirst } from '@/utils/weatherFormatters';
interface WeatherCardProps {
data: WeatherData;
}
export default function WeatherCard({ data }: WeatherCardProps) {
return (
<div className="weather-card bg-white rounded-lg shadow-lg p-6 mb-6">
<div className="flex items-center justify-between">
<div>
<h2 className="text-2xl font-bold">{data.name}</h2>
<p className="text-gray-600">{formatDate(data.dt)}</p>
</div>
<div className="text-right">
<WeatherIcon icon={data.weather[0].icon}
description={data.weather[0].description} />
<p className="text-sm text-gray-600 capitalize">
{capitalizeFirst(data.weather[0].description)}
</p>
</div>
</div>
<div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
<div className="text-center">
<p className="text-4xl font-bold">{formatTemperature(data.main.temp)}</p>
<p className="text-sm text-gray-600">Temperatura</p>
</div>
<div className="text-center">
<p className="text-xl">{data.main.humidity}%</p>
<p className="text-sm text-gray-600">Humedad</p>
</div>
<div className="text-center">
<p className="text-xl">{data.wind.speed} m/s</p>
<p className="text-sm text-gray-600">Viento</p>
</div>
<div className="text-center">
<p className="text-xl">{data.main.pressure} hPa</p>
<p className="text-sm text-gray-600">Presión</p>
</div>
</div>
<div className="mt-4 grid grid-cols-2 gap-4">
<div className="text-center">
<p className="text-lg">Sensación:
{formatTemperature(data.main.feels_like)}</p>
</div>
<div className="text-center">
<p className="text-lg">
Min: {formatTemperature(data.main.temp_min)} / Max:
{formatTemperature(data.main.temp_max)}
</p>
</div>
</div>
</div>
);
}