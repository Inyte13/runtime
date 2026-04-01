import { useCategoriasStore } from '@/store/categoriasStore'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible'
import { useState } from 'react'
import CategoriaHeader from './CategoriaHeader'
import { Button } from './ui/button'
import { ChevronDown, Plus } from 'lucide-react'
import ListaActividades from './ListaActividades'

export default function Categoria({ id }: { id: number }) {
  const categoria = useCategoriasStore(state =>
    state.categoriasDetail.find(categoria => categoria.id === id)
  )
  // State creado para mostrar ActividadTemp
  const [crearActividad, setCrearActividad] = useState(false)
  // State creado para que sea automatico al abrir un collapsible
  const [abrir, setAbrir] = useState(true)
  if (!categoria) return
  return (
    <Collapsible open={abrir} onOpenChange={setAbrir} asChild>
      <article className='flex flex-col gap-y-1'>
        <header className='group flex items-center p-1.5 pl-2 bg-card rounded-lg'>
          <CategoriaHeader id={id} />
          <Button
            variant='ghost'
            size='icon-xs'
            onClick={() => {
              setCrearActividad(true)
              setAbrir(true)
            }}
          >
            <Plus />
          </Button>

          {categoria.actividades.length > 0 && (
            <CollapsibleTrigger asChild>
              <Button
                variant='ghost'
                size='icon-xs'
                className='[&[data-state=open]>svg]:rotate-180'
              >
                <ChevronDown />
              </Button>
            </CollapsibleTrigger>
          )}
        </header>

        {abrir && (
          <CollapsibleContent className='rounded-lg ml-3'>
            <ListaActividades
              id={id}
              crearActividad={crearActividad}
              setCrearActividad={setCrearActividad}
              setAbrir={setAbrir}
            />
          </CollapsibleContent>
        )}
        
      </article>
    </Collapsible>
  )
}
