import { useDiasStore } from '../store/diasStore'
import { memo, useCallback } from 'react'
import { manejarCtrlEnter } from '../utils/keyboard'
import { useCategoriasStore } from '@/store/categoriasStore'
import ComboboxCategoria from './ComboboxCategoria'
import Duracion from './Duracion'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from './ui/context-menu'
import { useColorStore } from '@/store/colorStore'
import { Textarea } from './ui/textarea'
import { ArrowDownFromLine, ArrowUpFromLine, Trash2 } from 'lucide-react'
import { ContextMenuGroup } from '@radix-ui/react-context-menu'

export default memo(function Bloque({
  id,
  idPrevio,
}: {
  id: number
  idPrevio: number
}) {

  const bloque = useDiasStore(state =>
    state.diaDetail?.bloques.find(bloque => bloque.id === id)
  )
  const actividad = useActividadesStore(state =>
    state.actividadesDetail.find(
      actividad => actividad.id === bloque?.id_actividad
    )
  )! // non-null assertion seguro por el loading en App

  const actualizarBloque = useDiasStore(state => state.actualizarBloque)
  const eliminarBloque = useDiasStore(state => state.eliminarBloque)

  const descripcion = bloque?.descripcion || ''
  const manejarDescripcion = useCallback(
    async (e: React.FocusEvent<HTMLTextAreaElement>) => {
      const newDescripcion = e.target.value
      if (newDescripcion === descripcion) return
      await actualizarBloque(id, { descripcion: e.target.value })
    },
    [id, descripcion, actualizarBloque]
  )
  if (!bloque) return null
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <article
          className='group/bloque flex flex-col border-l-2 border-border rounded-lg px-2 pb-2 pt-1 relative bg-card w-59'
          style={{
            borderLeftColor: color || categoria.color,
          }}
        >
          <Textarea
            className='border-border/50 rounded-lg py-1 px-2 shadow-none bg-transparent! min-h-0 focus:ring-0 focus:text-foreground resize-none overflow-hidden text-foreground/70 mt-1'
            placeholder='Añadir descripción'
            style={{ height: '30px' }}
            defaultValue={descripcion}
            onFocus={e => {
              e.currentTarget.style.height = 'auto'
              e.currentTarget.style.fieldSizing = 'content'
            }}
            onBlur={e => {
              e.currentTarget.style.height = '30px'
              e.currentTarget.style.fieldSizing = 'fixed'
              manejarDescripcion(e)
            }}
            onKeyDown={e => {
              if (e.key === 'Escape') {
                e.currentTarget.value = descripcion
                e.currentTarget.blur()
              }
              manejarCtrlEnter(e)
            }}
            maxLength={255}
          />
        </article>
      </ContextMenuTrigger>


      <span className='pl-1 text-foreground/70'>
        {bloque.hora} - {bloque.hora_fin}
      </span>

    </BloqueColor>
        <ContextMenuGroup>
          <ContextMenuItem
            onClick={() => eliminarBloque(id)}
            variant='destructive'
          >
            <Trash2 />
            Eliminar
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
})
