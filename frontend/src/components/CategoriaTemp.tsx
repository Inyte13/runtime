import { useCategoriasStore } from '@/store/categoriasStore'
import { useEffect, useRef, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { manejarEnter } from '@/utils/keyboard'

  // Si cambias el #A18072, cambialo en el backend (categoria.py) models y schemas
