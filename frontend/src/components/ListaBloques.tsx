import { useDiasStore } from '../store/diasStore'
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
import { Button } from './ui/button'
import { Plus } from 'lucide-react'

export default memo(function ListaBloques() {
  const idsBloques = useDiasStore(
    useShallow(state => state.diaDetail?.bloques.map(bloque => bloque.id))
  )
  const crearBloque = useDiasStore(state => state.crearBloque)
  const reordenarBloques = useDiasStore(state => state.reordenarBloques)
  // Que actue solo si se mueve mas de 5px
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  )
  return (
    <section className='flex flex-col h-full flex-1 min-h-0 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
      <DndContext
        onDragEnd={reordenarBloques}
        collisionDetection={closestCenter} // Si el centro del bloque cruza el otro intercambia
        modifiers={[restrictToVerticalAxis]} // El movimiento solo puede ser vertical
        sensors={sensors}
      >
        <SortableContext
          items={idsBloques ?? []}
          strategy={verticalListSortingStrategy} // Optimiza las animaciones
        >
          <ul className='flex flex-col gap-y-2'>
            {idsBloques?.map((id, i) => (
              <BloqueOrdenable
                key={id}
                id={id}
                idPrevio={idsBloques[i - 1]}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      <footer className='mt-2 pr-8'>
        <Button size='icon' className='w-full' onClick={() => crearBloque()}>
          <Plus />
        </Button>
      </footer>
    </section>
  )
})
