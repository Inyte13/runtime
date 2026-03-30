import { Trash2 } from 'lucide-react'
import ChangeColor from './ChangeColor'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useCategoriasStore } from '@/store/categoriasStore'
import { manejarEnter } from '@/utils/keyboard'

        onKeyDown={e => {
          if (e.key === 'Escape') {
            e.currentTarget.value = nombre
            e.currentTarget.blur()
          }
          manejarEnter(e)
        }}
