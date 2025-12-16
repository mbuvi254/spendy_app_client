import { useEffect } from 'react'

interface ToastProps {
  message: string
  isVisible: boolean
  onHide: () => void
}

const Toast = ({ message, isVisible, onHide }: ToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onHide()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onHide])

  if (!isVisible) return null

  return (
    <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
      <p className="font-semibold">{message}</p>
    </div>
  )
}

export default Toast
