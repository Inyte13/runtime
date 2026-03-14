import { useEffect, useState } from 'react'

export function useMediaQuery(size = 1024) {
  const [isSmall, setIsSmall] = useState(window.innerWidth < size)
  useEffect(() => {
    const handleSize = () => setIsSmall(window.innerWidth < size)
    window.addEventListener('resize', handleSize)
    return () => window.removeEventListener('resize', handleSize)
  }, [size])
  return isSmall
}
