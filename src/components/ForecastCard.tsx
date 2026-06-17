import { motion } from 'framer-motion'
import { Cloud, CloudRain, Sun } from 'lucide-react'

interface ForecastData {
  dt: number
  main: {
    temp: number
    temp_min: number
    temp_max: number
    humidity: number
  }
  weather: Array<{
    main: string
    description: string
  }>
  wind: {
    speed: number
  }
}

interface ForecastCardProps {
  forecast: ForecastData
  unit: string
  index: number
}

const getWeatherIcon = (description: string) => {
  const desc = description.toLowerCase()
  if (desc.includes('rain')) return <CloudRain className="w-12 h-12 text-blue-300" />
  if (desc.includes('cloud')) return <Cloud className="w-12 h-12 text-gray-300" />
  if (desc.includes('sun') || desc.includes('clear')) return <Sun className="w-12 h-12 text-yellow-300" />
  return <Cloud className="w-12 h-12 text-gray-400" />
}

export default function ForecastCard({ forecast, unit, index }: ForecastCardProps) {
  const date = new Date(forecast.dt * 1000)
  const tempUnit = unit === 'metric' ? '°C' : '°F'

  return (
    <motion.div
      className="bg-white/20 backdrop-blur-md rounded-2xl p-6 text-white text-center border border-white/30 hover:bg-white/30 transition cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
    >
      <h4 className="font-semibold text-lg mb-4">
        {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
      </h4>
      
      <div className="flex justify-center mb-4">
        {getWeatherIcon(forecast.weather[0].description)}
      </div>
      
      <div className="space-y-2">
        <p className="text-sm capitalize text-blue-100">{forecast.weather[0].description}</p>
        <div className="flex justify-center gap-4 text-sm">
          <div>
            <p className="text-blue-200">High</p>
            <p className="text-2xl font-bold">{Math.round(forecast.main.temp_max)}{tempUnit}</p>
          </div>
          <div>
            <p className="text-blue-200">Low</p>
            <p className="text-2xl font-bold">{Math.round(forecast.main.temp_min)}{tempUnit}</p>
          </div>
        </div>
        <p className="text-xs text-blue-200 pt-2">Humidity: {forecast.main.humidity}%</p>
      </div>
    </motion.div>
  )
}