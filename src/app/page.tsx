'use client';

import { useState, useEffect } from 'react';
import WeatherCard from '@/components/WeatherCard';
import SearchBar from '@/components/SearchBar';
import Forecast from '@/components/Forecast';
import Loading from '@/components/Loading';
import ErrorDisplay from '@/components/ErrorDisplay';
import { WeatherData, ForecastData } from '@/types/weather';

const API_URL = process.env.NEXT_PUBLIC_WEATHER_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeatherData = async (city: string) => {
    if (!API_KEY || !API_URL) {
      setError('Configuración de API incompleta');
      return;
    }

    if (!city.trim()) {
      setError('Por favor ingresa una ciudad');
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Datos actuales
      const currentResponse = await fetch(
        `${API_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`
      );

      if (!currentResponse.ok) throw new Error('Ciudad no encontrada');

      const currentData: WeatherData = await currentResponse.json();
      setWeatherData(currentData);

      // Pronóstico
      const forecastResponse = await fetch(
        `${API_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=es`
      );

      if (!forecastResponse.ok) throw new Error('Error al obtener pronóstico');

      const forecastData: ForecastData = await forecastResponse.json();
      setForecastData(forecastData);

      // Guardar última ciudad buscada
      localStorage.setItem('lastCity', city);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al buscar clima');
    } finally {
      setLoading(false);
    }
  };

  // Carga inicial con ciudad por defecto o última buscada
  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity');
    fetchWeatherData(lastCity || "Madrid");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          App Clima
        </h1>

        <SearchBar onSearch={fetchWeatherData} />
        
        {loading && <Loading />}
        {error && <ErrorDisplay message={error} />}
        {weatherData && <WeatherCard data={weatherData} />}
        {forecastData && <Forecast data={forecastData} />}
      </div>
    </div>
  );
}
