import { BloqueReadMes } from "@/types/Bloque"

export default function BloquesMes({ bloque, color, nombre }: {
  bloque: BloqueReadMes
  color: string
  nombre: string
}) {
  return (
    <div className='group relative'>
      <div
        className='h-1.5 rounded-sm w-full cursor-default'
        style={{ backgroundColor: color }}
      />
      {/* Tooltip */}
      <div className='absolute bottom-full left-0 mb-1 z-10 hidden group-hover:flex flex-col bg-popover border border-border rounded-md px-2 py-1.5 shadow-md text-xs min-w-28 gap-0.5'>
        <span className='font-medium text-foreground'>{nombre}</span>
        <span className='text-muted-foreground'>{bloque.duracion}h</span>
        {bloque.descripcion && (
          <span className='text-muted-foreground italic'>{bloque.descripcion}</span>
        )}
      </div>
    </div>
  )
}