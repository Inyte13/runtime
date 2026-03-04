import Bloque from './Bloque'
import { memo } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

// Creado solo para separar el li del bloque y dejarlo limpio
export default memo(function BloqueOrdenable({ id }: { id: number }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  // Son las coordenadas exactas para que el bloque persiga a tu ratón
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li
      ref={setNodeRef} // El contenedor que se movera
      style={style}
      className='list-none w-full relative'
    >
      <Bloque id={id} />
      <div
        // El handle, el unico receptor del agarre
        {...attributes}
        {...listeners}
        className='absolute top-1/2 -translate-y-1/2 right-0 z-10 cursor-grab active:cursor-grabbing opacity-30 hover:opacity-100 transition-opacity'
      >
        <GripVertical />
      </div>
    </li>
  )
})
