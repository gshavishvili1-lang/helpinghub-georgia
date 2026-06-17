import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

interface SearchBarProps {
  onSearch: (city: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(input)
    setInput('')
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="relative w-full md:w-96"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for a city..."
          className="w-full px-6 py-3 pr-12 rounded-lg bg-white/20 text-white placeholder-blue-100 backdrop-blur-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
        />
        <motion.button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Search size={20} />
        </motion.button>
      </div>
    </motion.form>
  )
}