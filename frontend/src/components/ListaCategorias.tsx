import { useCategoriasStore } from '@/store/categoriasStore'
import { useState } from 'react'
import Categoria from './Categoria'
import { Ghost, Plus } from 'lucide-react'
import CategoriaTemp from './CategoriaTemp'
import { Button } from './ui/button'

export default function ListaCategorias() {
  const categorias = useCategoriasStore(state => state.categoriasDetail)

  // State creado para mostrar CategoriaTemp
  const [crearCategoria, setCrearCategoria] = useState(false)
  // TODO: Drag and drop para ordenar
  return (
    <section className='m-0 flex flex-col min-h-0 gap-y-0'>
      <header className='self-end'>
        <Button
          size='icon-xs'
          variant='ghost'
          onClick={() => setCrearCategoria(true)}
        >
          <Plus />
        </Button>
      </header>

      <section className='flex flex-col gap-y-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
        {categorias.map(categoria => (
          <Categoria key={categoria.id} id={categoria.id} />
        ))}

        {crearCategoria && (
          <CategoriaTemp setCrearCategoria={setCrearCategoria} />
        )}
        {categorias.length === 0 && !crearCategoria && (
          <div
            data-slot='wrapper'
            className='flex items-center justify-center gap-1 text-muted-foreground p-4 bg-card rounded-lg w-full'
          >
            <Ghost className='size-4' />
            <p className='text-sm'>Sin categorias</p>
          </div>
        )}
      </section>
    </section>
  )
}
