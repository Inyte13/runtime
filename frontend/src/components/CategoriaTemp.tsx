import { useCategoriasStore } from '@/store/categoriasStore'
import { useEffect, useRef, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { manejarEnter } from '@/utils/keyboard'

export default function CategoriaTemp({
  setCrearCategoria,
}: {
  setCrearCategoria: (value: boolean) => void
}) {
  const crearCategoria = useCategoriasStore(state => state.crearCategoria)
  const tempRef = useRef<HTMLDivElement>(null)
  const [nombreTemp, setNombreTemp] = useState('')
  // Auto-scroll cuando se crea el holograma de Actividad
  useEffect(() => {
    tempRef.current?.scrollIntoView({ behavior: 'auto', block: 'end' })
  }, [])
  const actualizar = () => {
    const nombre = nombreTemp.trim()
    setCrearCategoria(false)
    if (nombre) {
      crearCategoria({ nombre: nombre.toLowerCase() })
    }
  }
  const manejarBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      actualizar()
    }
  }
  // Si cambias el #A18072, cambialo en el backend (categoria.py) models y schemas
  return (
    <div
      ref={tempRef}
      onBlur={manejarBlur}
      tabIndex={0} // Para que sea focusable
      className='flex items-center p-1.5 pl-2 bg-card rounded-lg'
    >
      <span className='rounded-full size-4 shrink-0 bg-[#A18072] opacity-50' />
      <Input
        autoFocus
        className='capitalize italic p-0 border-none outline-none h-[1.6rem] shadow-none pl-2'
        value={nombreTemp}
        onChange={e => setNombreTemp(e.target.value)}
        maxLength={50}
        onKeyDown={e => {
          if (e.key === 'Escape') setCrearCategoria(false)
          manejarEnter(e)
        }}
      />
      <Button variant='ghost' size='icon-xs' disabled>
        <Plus />
      </Button>
    </div>
  )
}
