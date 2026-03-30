import { ChevronLeft, ChevronRight, Menu, Moon, Sun } from 'lucide-react'
import { useFechaStore } from '../store/fechaStore.js'
import { Button } from './ui/button.js'
import { formatFechaTitle } from '../utils/formatDate.js'
import { useDiasStore } from '@/store/diasStore.js'
import Calendario from './Calendario.js'
import Sidebar from './Sidebar.js'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils.js'

export default function Layout() {
  const { prevDia, nextDia, irHoy, prevMes, nextMes } = useFechaStore()
  const fecha = useFechaStore(state => state.fecha)
  const fechaTitle = formatFechaTitle(fecha)
  const traerDiasResumen = useDiasStore(state => state.traerDiasResumen)
  useEffect(() => {
    traerDiasResumen()
  }, [traerDiasResumen])
  const [sidebarOpen, setSidebarOpen] = useState(true)
  // Btn para dark mode
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem('theme') === 'dark'
  )
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])
        <Button
          size='icon-sm'
          variant='ghost'
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu />
        </Button>
        <div className='flex items-center gap-x-1'>
          <Button
            size='icon-sm'
            variant='ghost'
            onClick={() => setIsDark(!isDark)}
          >
            {isDark ? <Sun /> : <Moon />}
          </Button>

          <Button
            size='icon'
            variant='secondary'
            className='rounded-full'
            onClick={prevDia}
          >
            <ChevronLeft />
          </Button>
          <Button variant='secondary' onClick={irHoy}>
            Hoy
          </Button>
          <Button
            size='icon'
            variant='secondary'
            className='rounded-full'
            onClick={nextDia}
          >
            <ChevronRight />
          </Button>
        </div>
