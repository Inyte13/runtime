import { cn } from '@/lib/utils.js'
import { useActividadesStore } from '../store/actividadesStore.js'
import { useColorStore } from '../store/colorStore.js'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover.js'
import { Button } from './ui/button.js'
import { colores } from '@/lib/colors.js'

export default function ColorChange({
  id,
  colorFallback,
  is_active,
}: {
  id: number
  colorFallback: string
  is_active: boolean
}) {
  const color = useColorStore(state => state.colores[id] || colorFallback)
  const setColor = useColorStore(state => state.setColor)
  const actualizarActividad = useActividadesStore(
    state => state.actualizarActividad
  )
  // TODO: Añadir el Pipette en el input
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className='rounded-full size-4'
          size='icon'
          disabled={!is_active}
          style={{ background: color }}
        />
      </PopoverTrigger>
      <PopoverContent
        side='top'
        align='start'
        className='w-41 py-1'
        sideOffset={8}
        alignOffset={0}
      >
        <div className='flex gap-1 overflow-x-auto p-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
          {colores.map(({ nombre, hex }) => (
            <Button
              key={nombre}
              size='icon'
              className='size-4 rounded-full'
              style={{ background: hex }}
              onClick={async ()=> {
                setColor(id, hex)
                await actualizarActividad(id, { color: hex })
              }}
            />
          ))}

          <input
            style={{ background: color }}
            className={cn(
              'rounded-full size-4 shrink-0 cursor-pointer p-0',
              '[&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:opacity-0 [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch]:rounded-full [&::-moz-color-swatch]:border-none [&::-moz-color-swatch]:rounded-full [&::-moz-color-swatch]:opacity-0'
            )}
            type='color'
            value={color}
            onChange={e => setColor(id, e.target.value)}
            onBlur={async e =>
              await actualizarActividad(id, { color: e.target.value })
            }
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
