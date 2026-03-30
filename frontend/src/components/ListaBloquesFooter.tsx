import { memo } from 'react'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { useDiasStore } from '@/store/diasStore'

// Solo para no renderizas el btn cuando use el ComboboxCategoria
export default memo(function ListaBloquesFooter() {
  const crearBloque = useDiasStore(state => state.crearBloque)
  return (
    <footer className='mt-2 pr-8'>
      <Button size='icon' className='w-full' onClick={() => crearBloque()}>
        <Plus />
      </Button>
    </footer>
  )
})
