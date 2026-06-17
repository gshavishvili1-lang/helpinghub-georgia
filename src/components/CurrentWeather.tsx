import { motion } from 'framer-motion'
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye } from 'lucide-react'

interface WeatherData {
  main: {
    temp: number
    feels_like: number
    humidity: number
    pressure: number
  }
  weather: Array<{
    main: string
    description: string
    icon: string
  }>
  wind: {
    speed: number
  }
  visibility: number
  name: string
  sys: {
    country: string
  }
}

interface CurrentWeatherProps {
  weather: WeatherData
  unit: string
}

const getWeatherIcon = (description: string) => {
  const desc = description.toLowerCase()
  if (desc.includes('rain')) return <CloudRain className="w-20 h-20 text-blue-200" />
  if (desc.includes('cloud')) return <Cloud className="w-20 h-20 text-gray-300" />
  if (desc.includes('sun') || desc.includes('clear')) return <Sun className="w-20 h-20 text-yellow-200" />
  return <Cloud className="w-20 h-20 text-gray-400" />
}

export default function CurrentWeather({ weather, unit }: CurrentWeatherProps) {
  const tempUnit = unit === 'metric' ? '°C' : '°F'
  const speedUnit = unit === 'metric' ? 'm/s' : 'mph'

  return (
    <motion.div
      className="bg-white/20 backdrop-blur-md rounded-3xl p-8 md:p-12 text-white border border-white/30 shadow-2xl mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Side - Temperature */}
        <motion.div
          className="flex items-center gap-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div>
            {getWeatherIcon(weather.weather[0].description)}
          </div>
          <div>
            <h2 className="text-6xl md:text-7xl font-bold drop-shadow-lg">
              {Math.round(weather.main.temp)}{tempUnit}
            </h2>
            <p className="text-xl text-blue-100 capitalize mt-2">
              {weather.weather[0].description}
            </p>
          </div>
        </motion.div>

        {/* Right Side - Location and Details */}
        <motion.div
          className="text-center md:text-right"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-4xl font-bold mb-4">
            {weather.name}, {weather.sys.country}
          </h3>
          <div className="space-y-2 text-lg">
            <p>Feels like: <span className="font-semibold">{Math.round(weather.main.feels_like)}{tempUnit}</span></p>
            <p>Humidity: <span className="font-semibold">{weather.main.humidity}%</span></p>
            <p>Wind: <span className="font-semibold">{weather.wind.speed} {speedUnit}</span></p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}