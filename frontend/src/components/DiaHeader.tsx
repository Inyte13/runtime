import { useEffect, useRef } from 'react'
import { useDiasStore } from '../store/diasStore'
import { useFechaStore } from '../store/fechaStore'
import { formatFechaDetail, formatFechaISO } from '../utils/formatDate'
import { Input } from './ui/input'

export default function DiaHeader() {
  const fecha = useFechaStore(state => state.fecha)
  const fechaISO = formatFechaISO(fecha)
  const fechaDetail = formatFechaDetail(fecha)
  const titulo = useDiasStore(state => state.diaDetail?.titulo) || ''
  const actualizarDia = useDiasStore(state => state.actualizarDia)

  // Creame una ref pero por ahora es null
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // El input ya existe en HTML?
    if (inputRef.current) {
      // Usa el valor de la bd
      inputRef.current.value = titulo
    }
  }, [titulo])

  const manejarTitulo = async () => {
    const newTitulo = inputRef.current?.value || ''
    if (newTitulo === titulo) return
    await actualizarDia(fechaISO, { titulo: newTitulo })
  }

  return (
    <header className='flex flex-col gap-y-1 items-center pr-8'>
      <h2 className='text-2xl font-semibold'>{fechaDetail}</h2>
      <Input
        ref={inputRef} // 4. Conectamos la referencia al componente
        className='text-center text-base border-0 text-foreground/70 shadow-none'
        defaultValue={titulo} // Solo se lee la primera vez
        placeholder='Añadir título'
        onBlur={manejarTitulo}
        maxLength={150}
      />
    </header>
  )
}
