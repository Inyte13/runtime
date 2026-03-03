import { Plus } from 'lucide-react'
import { useDiasStore } from '../store/diasStore'
import { Button } from './ui/button'
import { memo } from 'react'
import BloqueOrdenable from './BloqueOrdenable'
import { useShallow } from 'zustand/react/shallow'
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'

export default memo(function ListaBloques() {
  // (?.): Lo usamos porque diaDetail puede no estar creado
  // (|| []): Lo usamos porque los bloques puede no tener bloques ([])
  const bloques = useDiasStore(state => state.diaDetail?.bloques) || []
  const crearBloque = useDiasStore(state => state.crearBloque)

  return (
    <section className='flex flex-col h-full'>
      <div className='flex-1 min-h-0 overflow-y-auto px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
        <ul className='flex flex-col gap-y-2'>
          {bloques.map(bloque => (
            <li key={bloque.id}>
              <Bloque bloque={bloque} />
            </li>
          ))}
        </ul>
        <Button className='w-full mt-2' onClick={crearBloque}>
          <Plus />
        </Button>
      </div>
    </section>
  )
})
