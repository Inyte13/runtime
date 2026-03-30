import { useCategoriasStore } from '@/store/categoriasStore'
import { useEffect, useRef, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { manejarEnter } from '@/utils/keyboard'

export default function CategoriaTemp({
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
        value={nombreTemp}
        onChange={e => setNombreTemp(e.target.value)}
    </div>
  )
}
