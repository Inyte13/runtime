import { useActividadesStore } from '../store/actividadesStore.js'
import { useColorStore } from '../store/colorStore.js'

export default function ColorPicker({
  id,
  colorFallback,
}: {
  id: number
  colorFallback: string
}) {
  const color = useColorStore(state => state.colores[id] || colorFallback)
  const setColor = useColorStore(state => state.setColor)
  const actualizarActividad = useActividadesStore(
    state => state.actualizarActividad
  )
  const manejarCambioColor = async (e: React.FocusEvent<HTMLInputElement>) => {
    await actualizarActividad(id, { color: e.target.value })
  }
  return (
    <input
      style={{ background: color }}
      className={`rounded-full size-4 shrink-0 cursor-pointer p-0 
        [&::-webkit-color-swatch-wrapper]:p-0
        [&::-webkit-color-swatch]:opacity-0 
        [&::-webkit-color-swatch]:border-none 
        [&::-webkit-color-swatch]:rounded-full
        [&::-moz-color-swatch]:border-none 
        [&::-moz-color-swatch]:rounded-full
        [&::-moz-color-swatch]:opacity-0
        `}
      type='color'
      value={color}
      onChange={e => setColor(id, e.target.value)}
      onBlur={manejarCambioColor}
    />
  )
}
