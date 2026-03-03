import { memo } from 'react'
import ColorPicker from './ColorPicker'
import { useActividadesStore } from '../store/actividadesStore'

export default memo(function Actividad({ actividad }: { actividad: ActividadRead}) {
  const nombreBd = actividad.nombre
  const nombre = nombreBd.charAt(0).toUpperCase() + nombreBd.slice(1)
  return (
    <div className='flex items-center gap-2 p-1.5 hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-lg'>
      <ColorPicker actividad={actividad} />
      <span>{nombre}</span>
    </div>
  )
})