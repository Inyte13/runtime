import { Trash2 } from 'lucide-react'
import ChangeColor from './ChangeColor'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useCategoriasStore } from '@/store/categoriasStore'
import { manejarEnter } from '@/utils/keyboard'

export default function CategoriaHeader({ id }: { id: number }) {
  const categoria = useCategoriasStore(state =>
    state.categoriasDetail.find(categoria => categoria.id === id)
  )
  const actualizarCategoria = useCategoriasStore(
    state => state.actualizarCategoria
  )
  const eliminarCategoria = useCategoriasStore(state => state.eliminarCategoria)
  if (!categoria) return

  const manejarNombre = async (e: React.FocusEvent<HTMLInputElement>) => {
    const newNombre = e.target.value.toLowerCase().trim()
    // Si el newNombre es '' o es igual al inicial
    if (!newNombre || newNombre === categoria.nombre) {
      e.target.value = categoria.nombre
      return
    }
    await actualizarCategoria(id, { nombre: newNombre })
  }
  return (
    <>
      <ChangeColor id={id} colorFallback={categoria.color} />
      <Input
        className='capitalize italic p-0 border-none outline-none h-[1.6rem] truncate shadow-none pl-2'
        defaultValue={categoria.nombre}
        onBlur={manejarNombre}
        maxLength={50}
        // Para dejar el foco con el enter
        onKeyDown={e => {
          if (e.key === 'Escape') {
            e.currentTarget.value = categoria.nombre
            e.currentTarget.blur()
          }
          manejarEnter(e)
        }}
      />

      {!categoria.actividades.length && (
        <Button
          size='icon-xs'
          variant='destructive'
          className='opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-none'
          onClick={() => eliminarCategoria(id)}
        >
          <Trash2 />
        </Button>
      )}
    </>
  )
}
