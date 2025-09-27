interface WeatherIconProps {
  icon: string;
  description: string;
  size?: 'small' | 'medium' | 'large';
}

export default function WeatherIcon({ icon, description, size = 'medium' }: WeatherIconProps) {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  return (
    <img
      src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
      alt={description}
      className={`mx-auto ${sizeClasses[size]}`}
    />
  );
}