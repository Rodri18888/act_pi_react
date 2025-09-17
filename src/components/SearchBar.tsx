'use client';
import { useState } from 'react';
interface SearchBarProps {
 onSearch: (city: string) => void;
}
export default function SearchBar({ onSearch }: SearchBarProps) {
 const [city, setCity] = useState('');
 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 if (city.trim()) {
 onSearch(city.trim());
 }
 };
 return (
 <form onSubmit={handleSubmit} className="mb-6">
 <div className="flex gap-2">
 <input
 type="text"
 value={city}
 onChange={(e) => setCity(e.target.value)}
 placeholder="Buscar ciudad..."
 className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2
focus:ring-blue-500"
 />
 <button
 type="submit"
 className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600
transition-colors"
 >
 Buscar
 </button>
 </div>
 </form>
 );
}
