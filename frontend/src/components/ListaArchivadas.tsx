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
    <>
        <ul className='flex flex-col divide-y divide-border/50 border-l-2 border-border rounded-lg bg-card/50'>
          {archivadas.map(actividad => (
            <li key={actividad.id}>
              <Actividad idActividad={actividad.id} />
            </li>
          ))}
        </ul>
    </>
  )
})
