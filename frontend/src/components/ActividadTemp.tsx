import { useRef, useState } from 'react'
import { useCategoriasStore } from '../store/categoriasStore'
import { Input } from './ui/input'
import { manejarEnter } from '../utils/keyboard'

export default function ActividadTemp({
  setCrear,
}: {
  setCrear: (value: boolean) => void
}) {
  const crearActividad = useActividadesStore(state => state.crearActividad)

  const tempRef = useRef<HTMLDivElement>(null)

  const [nombreTemp, setNombreTemp] = useState('')

    const nombre = nombreTemp.trim()
    if (nombre) {
      await crearActividad({ nombre: nombre.toLowerCase(), color: colorTemp })
    }
    setCrear(false)
  }

  const manejarBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    // Si el nuevo elemento clickeado está fuera, guardamos
    if (!e.currentTarget.contains(e.relatedTarget)) {
      actualizar()
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
