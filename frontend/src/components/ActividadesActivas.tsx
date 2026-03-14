import { Ghost, Search } from 'lucide-react'
import Actividad from './Actividad'
import ActividadTemp from './ActividadTemp'
import { useActividadesStore } from '@/store/actividadesStore'
import { useShallow } from 'zustand/react/shallow'
import { memo } from 'react'

export default memo(function ActividadesActivas({
  crear,
  setCrear,
  search,
}: {
  crear: boolean
  setCrear: (value: boolean) => void
  search: string
}) {
  // Sin el shallow filter y map crea un array nuevo en cada render, loop infinito
  const idsActivas = useActividadesStore(
    useShallow(state =>
      state.actividadesDetail
        .filter(
          actividad =>
            actividad.is_active &&
            actividad.nombre.includes(search.toLowerCase())
        )
        .map(actividad => actividad.id)
    )
  )
  const vacio = idsActivas.length === 0

  return (
    <>
      {!vacio ? (
        <ul className='flex flex-col divide-y divide-border/50 px-4 flex-1 overflow-y-auto border border-border rounded-lg bg-card text-card-foreground [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
          {idsActivas.map(id => (
            <li className='first:pt-2 last:pb-2' key={id}>
              <Actividad id={id} />
            </li>
          ))}
          {crear && (
            <li className='first:pt-2 last:pb-2'>
              <ActividadTemp setCrear={setCrear} />
            </li>
          )}
        </ul>
      ) : (
        <div className='h-full flex flex-col items-center justify-center gap-1 text-muted-foreground p-4 border border-border rounded-lg bg-card'>
          {search ? (
            <>
              <Search className='size-4' />
              <p className='text-sm'>Sin resultados</p>
            </>
          ) : (
            <>
              <Ghost className='size-4' />
              <p className='text-sm'>Sin actividades aún</p>
            </>
          )}
        </div>
      )}
    </>
  )
})
