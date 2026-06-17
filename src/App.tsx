import { useState, useEffect } from 'react'
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import CurrentWeather from './components/CurrentWeather'
import ForecastCard from './components/ForecastCard'
import SearchBar from './components/SearchBar'
import WeatherDetails from './components/WeatherDetails'
import LoadingSpinner from './components/LoadingSpinner'

const API_KEY = 'a6d185e4a4c0f1296909dc5002bf7f6' // OpenWeatherMap Free API

function App() {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [city, setCity] = useState('Tbilisi')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [unit, setUnit] = useState('metric') // metric for Celsius

  // Fetch weather data
  const fetchWeather = async (cityName) => {
    setLoading(true)
    setError(null)
    try {
      // Current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${API_KEY}`
      )

      if (!weatherResponse.ok) {
        throw new Error('City not found')
      }

      const weatherData = await weatherResponse.json()
      setWeather(weatherData)

      // Forecast data
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${unit}&appid=${API_KEY}`
      )
      const forecastData = await forecastResponse.json()
      
      // Get unique days (one forecast per day)
      const uniqueDays = {}
      forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString()
        if (!uniqueDays[date]) {
          uniqueDays[date] = item
        }
      })
      setForecast(Object.values(uniqueDays).slice(0, 5))
      setCity(cityName)
    } catch (err) {
      setError(err.message)
      setWeather(null)
      setForecast(null)
    } finally {
      setLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    fetchWeather(city)
  }, [])

  const handleSearch = (searchCity) => {
    if (searchCity.trim()) {
      fetchWeather(searchCity)
    }
  }

  const handleUnitChange = () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric'
    setUnit(newUnit)
    if (weather) {
      fetchWeather(city)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600">
      {/* Background Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"
          animate={{ y: [0, 50, 0], x: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-72 h-72 bg-purple-200/10 rounded-full blur-3xl"
          animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Weather Dashboard
            </h1>
            <p className="text-xl text-blue-100 drop-shadow-md">
              Real-time weather updates and forecasts
            </p>
          </motion.div>

          {/* Search and Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center">
            <SearchBar onSearch={handleSearch} />
            <motion.button
              onClick={handleUnitChange}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold backdrop-blur-md transition border border-white/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              °{unit === 'metric' ? 'C' : 'F'} / °{unit === 'metric' ? 'F' : 'C'}
            </motion.button>
          </div>

          {/* Loading State */}
          {loading && <LoadingSpinner />}

          {/* Error State */}
          {error && (
            <motion.div
              className="bg-red-500/80 text-white p-6 rounded-lg backdrop-blur-md text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-lg font-semibold">❌ {error}</p>
              <p className="text-sm mt-2">Please try searching for another city</p>
            </motion.div>
          )}

          {/* Current Weather */}
          {weather && <CurrentWeather weather={weather} unit={unit} />}

          {/* Weather Details Grid */}
          {weather && <WeatherDetails weather={weather} unit={unit} />}

          {/* Forecast */}
          {forecast && (
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-lg">5-Day Forecast</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {forecast.map((day, index) => (
                  <ForecastCard
                    key={index}
                    forecast={day}
                    unit={unit}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App