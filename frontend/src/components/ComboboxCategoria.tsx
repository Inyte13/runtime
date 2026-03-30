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

