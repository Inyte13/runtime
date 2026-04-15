import { create } from 'zustand'

interface ColorState {
  colores: Record<number, string>
  setColor: (id: number, color: string) => void
  setColores: (categorias: { id: number; color: string }[]) => void
  eliminarColor: (id: number) => void
}

export const useColorStore = create<ColorState>(set => ({
  colores: {},

  setColor: (id, color) =>
    // Solo cambiamos el color que cambia
    set(state => ({
      colores: { ...state.colores, [id]: color },
    })),

  setColores: categorias => {
    set({
      // Transforma en diccionario solo con id y color
      colores: Object.fromEntries(
        categorias.map(categoria => [categoria.id, categoria.color])
      ),
    })
  },

  eliminarColor: (id) => set(state => {
    const { [id]: _, ...colors} = state.colores
    return { colores: colors}
  })
}))
