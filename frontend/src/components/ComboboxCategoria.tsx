import { useCategoriasStore } from '../store/categoriasStore.js'
import { useDiasStore } from '../store/diasStore.js'
import {
  Combobox,
  ComboboxContent,
  ComboboxGroup,
  ComboboxInput,
  ComboboxLabel,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from './ui/combobox.js'
import { Button } from './ui/button.js'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import ComboboxActividad from './ComboboxActividad.js'

export default memo(function ComboboxCategoria({ id }: { id: number }) {
  // Es null al limpiar con el button X
  const manejarSelector = useCallback(
    async (idStr: string | null) => {
      if (!idStr) return
      await actualizarBloque(id, { id_actividad: parseInt(idStr) })
    },
    [id, actualizarBloque]
  )
  const [search, setSearch] = useState('')
  const sinTilde = (str: string) =>
    str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  // Reducer para no recorrer dos veces
  const categoriasFiltradas = useMemo(() => {
    const searchSinTilde = sinTilde(search)
    return categorias.reduce<typeof categorias>((acc, categoria) => {
      const actividades = categoria.actividades.filter(actividad =>
        sinTilde(actividad.nombre).includes(searchSinTilde)
      )
      if (actividades.length) acc.push({ ...categoria, actividades })
      return acc
    }, [])
  }, [categorias, search])
  // Si hay solo una actividad en la búsqueda, la usa
  useEffect(() => {
    const actividadesFiltradas = categoriasFiltradas.flatMap(
      cat => cat.actividades
    )
    if (actividadesFiltradas.length === 1) {
      manejarSelector(actividadesFiltradas[0].id.toString())
    }
  }, [categoriasFiltradas, manejarSelector])
  return (
    <Combobox
      items={items}
      onValueChange={manejarSelector}
      value={actividad?.id.toString()}
      onOpenChange={open => {
        if (!open) setSearch('')
      }}
    >
      <ComboboxTrigger
        render={
          <Button
            variant='secondary'
            className='px-2! gap-1 border-none text-card-foreground hover:bg-secondary whitespace-normal w-full justify-start'
          >
            <span className='capitalize text-2xl font-light truncate'>
              <ComboboxValue />
            </span>
          </Button>
        }
      />
      <ComboboxContent className='w-[17ch] text-popover-foreground'>
        <ComboboxInput
          showTrigger={false}
          showClear={true}
          placeholder='Buscar'
          onChange={e => setSearch(e.target.value.toLowerCase())}
        />

        {categoriasFiltradas.length === 0 && (
          <p className='py-4 text-center text-sm text-muted-foreground'>
            No se encontraron actividades
          </p>
        )}
        {/* El ComboboxList siempre debe estar aunque este vacio */}
        <ComboboxList className='[&::-webkit-scrollbar]:hidden [scrollbar-width:none] px-2'>
          {categoriasFiltradas.map(categoria => (
            <ComboboxGroup key={categoria.id}>
              <ComboboxLabel className='capitalize truncate text-sm italic'>
                {categoria.nombre}
              </ComboboxLabel>
            </ComboboxGroup>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
})
