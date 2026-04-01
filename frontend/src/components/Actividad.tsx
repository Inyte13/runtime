import { memo } from 'react'
import { Input } from './ui/input'
import { manejarEnter } from '../utils/keyboard'
import { Button } from './ui/button'
import { Archive, ArchiveRestore, Trash2 } from 'lucide-react'
import { useCategoriasStore } from '@/store/categoriasStore'

export default memo(function Actividad({
  idActividad,
  idCategoria,
}: {
  idActividad: number
  idCategoria?: number
}) {
  const actividad = useCategoriasStore(state =>
    idCategoria
      ? state.categoriasDetail
          .find(categoria => categoria.id === idCategoria)
          ?.actividades.find(actividad => actividad.id === idActividad)
      : // Lo hacemos compatible con el ActividadTemp de ListaArchivadas
        state.categoriasDetail
          .flatMap(categoria => categoria.actividades)
          .find(actividad => actividad.id === idActividad)
  )
  const actualizarActividad = useCategoriasStore(
    state => state.actualizarActividad
  )
  const eliminarActividad = useCategoriasStore(state => state.eliminarActividad)
  if (!actividad) return null

  const manejarNombre = async (e: React.FocusEvent<HTMLInputElement>) => {
    const newNombre = e.target.value.toLowerCase().trim()
    // Si el newNombre es '' o es igual al inicial
    if (!newNombre || newNombre === actividad.nombre) {
      e.target.value = actividad.nombre
      return
    }
    await actualizarActividad(idActividad, { nombre: newNombre })
  }

  const manejarArchivar = async () => {
    await actualizarActividad(idActividad, { is_active: !actividad.is_active })
  }
  // TODO: Al mantener la actividad truncate, para mostrarla completa
  return (
    <div data-slot='wrapper' className='group flex py-1.5 px-3'>
      <Input
        className='capitalize p-0 pl-2 border-none outline-none h-[1.6rem] truncate shadow-none'
        defaultValue={actividad.nombre}
        onBlur={manejarNombre}
        maxLength={50}
        onKeyDown={e => {
          if (e.key === 'Escape') {
            e.currentTarget.value = actividad.nombre
            e.currentTarget.blur()
          }
          manejarEnter(e)
        }}
        disabled={!actividad.is_active}
      />

      <Button
        size='icon-xs'
        variant='ghost'
        className='opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-none'
        onClick={manejarArchivar}
      >
        {actividad.is_active ? <Archive /> : <ArchiveRestore />}
      </Button>

      {!actividad.tiene_bloques && (
        <Button
          size='icon-xs'
          variant='destructive'
          className='opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-none'
          onClick={() => eliminarActividad(idActividad)}
        >
          <Trash2 />
        </Button>
      )}
    </div>
  )
})
