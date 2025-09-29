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
      const currentResponse = await fetch(
        `${API_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`
      );

      if (!currentResponse.ok) throw new Error('Ciudad no encontrada');

      const currentData: WeatherData = await currentResponse.json();
      setWeatherData(currentData);

      const forecastResponse = await fetch(
        `${API_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=es`
      );

      if (!forecastResponse.ok) throw new Error('Error al obtener pronóstico');

      const forecastData: ForecastData = await forecastResponse.json();
      console.log('Forecast data received:', forecastData); // ✅ Debug
      setForecastData(forecastData);

      localStorage.setItem('lastCity', city);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al buscar clima');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity');
    fetchWeatherData(lastCity || "Madrid");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-300 to-cyan-200 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">App Clima</h1>
          <p className="text-blue-900 font-medium">Pronóstico del tiempo en tiempo real</p>
        </div>

        <SearchBar onSearch={fetchWeatherData} />
        
        {loading && <Loading />}
        {error && <ErrorDisplay message={error} />}
        
        <div className="space-y-6">
          {weatherData && <WeatherCard data={weatherData} />}
          
          {/* Sección de depuración del Forecast */}
          {forecastData ? (
            <>
              {/* Mensaje de debug - solo visible en desarrollo */}
              {process.env.NODE_ENV === 'development' && (
                <div className="bg-yellow-100 border border-yellow-400 p-3 rounded-lg">
                  <p className="text-yellow-800 font-bold">Debug Info:</p>
                  <p className="text-yellow-700">Forecast items: {forecastData.list?.length || 0}</p>
                  <p className="text-yellow-700">City: {forecastData.city?.name}</p>
                </div>
              )}
              
              <Forecast data={forecastData} />
            </>
          ) : (
            !loading && (
              <div className="bg-blue-50 rounded-2xl shadow-xl p-6 border border-blue-200 text-center">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">Pronóstico 5 Días</h3>
                <p className="text-blue-700">Cargando datos del pronóstico...</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
