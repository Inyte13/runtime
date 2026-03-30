import { useCategoriasStore } from '../store/categoriasStore.js'
import { useColorStore } from '../store/colorStore.js'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover.js'
import { Button } from './ui/button.js'
import { colores } from '@/lib/colors.js'
import { HexColorPicker } from 'react-colorful'
import { Separator } from './ui/separator.js'

export default function ChangeColor({
  id,
  colorFallback,
}: {
  id: number
  colorFallback: string
}) {
  const color = useColorStore(state => state.colores[id] || colorFallback)
  const setColor = useColorStore(state => state.setColor)
  const actualizarCategoria = useCategoriasStore(
    state => state.actualizarCategoria
  )
  return (
    <Popover
      onOpenChange={async open => {
        if (!open) {
          await actualizarCategoria(id, { color })
        }
      }}
    >

    </Popover>
  )
}
