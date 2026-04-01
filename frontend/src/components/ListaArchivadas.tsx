import { useCategoriasStore } from '@/store/categoriasStore'
import Actividad from './Actividad'
import { memo } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { Archive } from 'lucide-react'

export default memo(function ListaArchivadas() {
  const archivadas = useCategoriasStore(
    useShallow(state =>
      state.categoriasDetail
        .flatMap(categoria => categoria.actividades)
        .filter(actividad => !actividad.is_active)
    )
  )
  return (
    <section className='m-0 flex flex-col flex-1 gap-y-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
      {archivadas.length > 0 && (
        <ul className='flex flex-col divide-y divide-border/50 border-l-2 border-border rounded-lg bg-card/50'>
          {archivadas.map(actividad => (
            <li key={actividad.id}>
              <Actividad idActividad={actividad.id} />
            </li>
          ))}
        </ul>
      )}
      {archivadas.length === 0 && (
        <div
          data-slot='wrapper'
          className='flex items-center justify-center gap-1 text-muted-foreground p-4 bg-card rounded-lg'
        >
          <Archive className='size-4' />
          <p className='text-sm'>Sin Archivados</p>
        </div>
      )}
    </section>
  )
})
