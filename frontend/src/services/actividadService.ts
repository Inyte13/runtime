import {
  ActividadCreate,
  ActividadRead,
  ActividadReadDetail,
  ActividadUpdate,
} from '../types/Actividad'

const URL = '/actividades'

export async function createActividad(
  actividad: ActividadCreate
): Promise<ActividadReadDetail> {
  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(actividad),
  })
  if (!res.ok) throw new Error('Error al crear la actividad')
  return res.json()
}

export async function updateActividad(
  id: number,
  actividad: ActividadUpdate
): Promise<ActividadRead> {
  const res = await fetch(`${URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(actividad),
  })
  if (!res.ok) throw new Error('Error al actualizar la actividad')
  return res.json()
}

export async function deleteActividad(id: number): Promise<void> {
  const res = await fetch(`${URL}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Error al eliminar la actividad')
}
