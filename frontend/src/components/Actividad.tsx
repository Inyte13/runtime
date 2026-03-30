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
  // Lo hacemos compatible con el Actividad de ListaArchivadas
  const actividad = useCategoriasStore(state =>
    idCategoria
      ? state.categoriasDetail
          .find(categoria => categoria.id === idCategoria)
          ?.actividades.find(actividad => actividad.id === idActividad)
      : state.categoriasDetail
          .flatMap(categoria => categoria.actividades)
          .find(actividad => actividad.id === idActividad)
  )
  const actualizarActividad = useActividadesStore(
    state => state.actualizarActividad
  )
  const eliminarActividad = useActividadesStore(
    state => state.eliminarActividad
  )
  if (!actividad) return null

  const { nombre, tiene_bloques, is_active } = actividad
  const manejarNombre = async (e: React.FocusEvent<HTMLInputElement>) => {
    const newNombre = e.target.value.toLowerCase().trim()
    // Si el newNombre es '' o es igual al inicial
    if (!newNombre || newNombre === nombre) {
      e.target.value = nombre
      return
    }
    await actualizarActividad(idActividad, { nombre: newNombre })
  }

  const manejarArchivar = async () => {
    await actualizarActividad(idActividad, { is_active: !is_active })
  }
  
  return (
    <div className='group flex items-center p-1.5 rounded-lg'>
      <ColorChange
        id={id}
        colorFallback={colorFallback}
        is_active={is_active}
      />
      <Input
        className={cn(
          'capitalize p-0 pl-2 border-none outline-none rounded-none h-[1.6rem] truncate',
          !is_active && 'italic'
        )}
        defaultValue={nombre}
        onBlur={manejarNombre}
        maxLength={50}
        // Para dejar el foco con el enter
        onKeyDown={manejarEnter}
        disabled={!is_active}
      />

      <Button
        size='icon-xs'
        variant='ghost'
        className='opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-none'
        onClick={manejarArchivar}
      >
        {is_active ? <Archive /> : <ArchiveRestore />}
      </Button>
      
      {!tiene_bloques && (
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
