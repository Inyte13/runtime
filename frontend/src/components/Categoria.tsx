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
  if (!categoria) return
  return (
    <Collapsible open={abrir} onOpenChange={setAbrir} asChild>
          {categoria.actividades.length > 0 && (
          )}
    </Collapsible>
  )
}
