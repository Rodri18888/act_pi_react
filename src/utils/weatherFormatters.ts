export const formatTemperature = (temp: number): string => {
return `${Math.round(temp)}°C`;
};
export const formatDate = (timestamp: number): string => {
return new Date(timestamp * 1000).toLocaleDateString('es-ES', {
weekday: 'long',
year: 'numeric',
month: 'long',
day: 'numeric'
});
};
export const formatTime = (timestamp: number): string => {
return new Date(timestamp * 1000).toLocaleTimeString('es-ES', {
hour: '2-digit',
minute: '2-digit'
});
};
export const capitalizeFirst = (str: string): string => {
return str.charAt(0).toUpperCase() + str.slice(1);
};
export const getWindDirection = (degrees: number): string => {
const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
const index = Math.round(degrees / 45) % 8;
return directions[index];
};