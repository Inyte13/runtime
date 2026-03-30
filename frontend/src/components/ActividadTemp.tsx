import { useRef, useState } from 'react'
import { useCategoriasStore } from '../store/categoriasStore'
import { Input } from './ui/input'
import { manejarEnter } from '../utils/keyboard'

export default function ActividadTemp({
  setCrearActividad,
  id,
  setAbrir,
}: {
  setCrearActividad: (value: boolean) => void
  id: number
  setAbrir: (value: boolean) => void
}) {
  const crearActividad = useCategoriasStore(state => state.crearActividad)
  const categoria = useCategoriasStore(state =>
    state.categoriasDetail.find(categoria => categoria?.id === id)
  )
  const tempRef = useRef<HTMLDivElement>(null)

  const [nombreTemp, setNombreTemp] = useState('')
  if (!categoria) return

  const actualizar = () => {
    const nombre = nombreTemp.trim()
    setCrearActividad(false)
    if (nombre) {
      crearActividad({
        nombre: nombre.toLowerCase(),
        id_categoria: id,
      })
    }
  }

  const manejarBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    // Si el nuevo elemento clickeado está fuera, guardamos
    if (!e.currentTarget.contains(e.relatedTarget)) {
      actualizar()
      if (!nombreTemp.trim()) {
        if (!categoria.actividades.length) setAbrir(false)
      }
    }
  }

  return (
    <div
      ref={tempRef}
      onBlur={manejarBlur}
      tabIndex={0} // Para que sea focusable
      className='flex items-center py-1.5 px-3'
    >
      <Input
        autoFocus
        className='capitalize p-0 pl-2 border-none outline-none h-[1.6rem] truncate'
        value={nombreTemp}
        onChange={e => setNombreTemp(e.target.value)}
        maxLength={50}
        onKeyDown={manejarEnter}
      />
    </div>
  )
}
