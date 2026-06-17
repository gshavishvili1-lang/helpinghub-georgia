import { motion } from 'framer-motion'
import { Wind, Droplets, Eye, Gauge } from 'lucide-react'

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
  }>
  wind: {
    speed: number
  }
  visibility: number
}

interface WeatherDetailsProps {
  weather: WeatherData
  unit: string
}

export default function WeatherDetails({ weather, unit }: WeatherDetailsProps) {
  const speedUnit = unit === 'metric' ? 'm/s' : 'mph'
  const visibilityUnit = unit === 'metric' ? 'km' : 'mi'
  const visibility = unit === 'metric' ? (weather.visibility / 1000).toFixed(1) : ((weather.visibility / 1000) * 0.621371).toFixed(1)

  const details = [
    {
      icon: Wind,
      label: 'Wind Speed',
      value: `${weather.wind.speed} ${speedUnit}`,
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: Droplets,
      label: 'Humidity',
      value: `${weather.main.humidity}%`,
      color: 'from-cyan-400 to-cyan-600'
    },
    {
      icon: Eye,
      label: 'Visibility',
      value: `${visibility} ${visibilityUnit}`,
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: Gauge,
      label: 'Pressure',
      value: `${weather.main.pressure} hPa`,
      color: 'from-orange-400 to-orange-600'
    }
  ]

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      {details.map((detail, index) => {
        const Icon = detail.icon
        return (
          <motion.div
            key={index}
            className={`bg-gradient-to-br ${detail.color} rounded-2xl p-6 text-white backdrop-blur-md border border-white/30 shadow-lg`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-semibold mb-2">{detail.label}</p>
                <p className="text-3xl font-bold">{detail.value}</p>
              </div>
              <Icon className="w-12 h-12 text-white/70" />
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}