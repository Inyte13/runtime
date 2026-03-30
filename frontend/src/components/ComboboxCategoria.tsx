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
    </Combobox>
  )
})
