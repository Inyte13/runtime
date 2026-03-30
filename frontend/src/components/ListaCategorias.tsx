import { useCategoriasStore } from '@/store/categoriasStore'
import { useState } from 'react'
import Categoria from './Categoria'
import { Ghost, Plus } from 'lucide-react'
import CategoriaTemp from './CategoriaTemp'
import { Button } from './ui/button'

export default function ListaCategorias() {
  const ids = useCategoriasStore(state => state.categoriasDetail).map(
    categoriaDetail => categoriaDetail.id
  const [crearCategoria, setCrearCategoria] = useState(false)
  // TODO: Drag and drop para ordenar
  return (
    <section className='m-0 flex flex-col min-h-0 gap-y-0 items-end'>
      <section className='flex flex-col gap-y-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
        {ids.map(id => (
          <Categoria key={id} id={id} />
        ))}
        {crearCategoria && (
          <CategoriaTemp setCrearCategoria={setCrearCategoria} />
        )}
      </section>
    </section>
  )
}
