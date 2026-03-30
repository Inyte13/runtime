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
