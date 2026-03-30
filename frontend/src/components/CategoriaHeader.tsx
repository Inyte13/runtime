import { Trash2 } from 'lucide-react'
import ChangeColor from './ChangeColor'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useCategoriasStore } from '@/store/categoriasStore'
import { manejarEnter } from '@/utils/keyboard'

  const actualizarCategoria = useCategoriasStore(
    state => state.actualizarCategoria
  )

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

