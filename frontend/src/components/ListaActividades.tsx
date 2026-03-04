import { useEffect, useState } from 'react'
import { useActividadesStore } from '../store/actividadesStore'
import Actividad from './Actividad'
import ListaActividadesFooter from './ListaActividadesFooter'
import { useShallow } from 'zustand/react/shallow'
import ActividadTemp from './ActividadTemp'

export default function ListaActividades() {
  const actividadesIds = useActividadesStore(
    useShallow(state => state.actividades.map(actividad => actividad.id))
  )
  const traerActividades = useActividadesStore(state => state.traerActividades)

  useEffect(() => {
    traerActividades()
  }, [traerActividades])

  return (
    <section className='flex flex-col h-full overflow-hidden p-4 gap-y-2 justify-content'>
      <div className='flex-1 min-h-0 overflow-y-auto border border-border rounded-lg bg-card text-card-foreground [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
        <ul className='flex flex-col divide-y divide-border/30 px-4'>
          {actividadesIds.map(id => (
            <li className='first:pt-2 last:pb-2' key={id}>
              <Actividad id={id} />
            </li>
          ))}
        </ul>
      </div>
      <ListaActividadesFooter />
    </section>
  )
}
