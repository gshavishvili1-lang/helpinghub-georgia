import { motion } from 'framer-motion'
import { Cloud } from 'lucide-react'

export default function LoadingSpinner() {
  return (
    <motion.div
      className="flex justify-center items-center py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        <Cloud className="w-16 h-16 text-white drop-shadow-lg" />
      </motion.div>
    </motion.div>
  )
}