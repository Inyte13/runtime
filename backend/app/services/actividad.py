from sqlmodel import Session

from app.crud.actividad import (
  create_actividad,
  delete_actividad,
  is_exists_bloque,
  read_actividad,
  update_actividad,
)
from app.models.actividad import Actividad
from app.schemas.actividad import (
  ActividadCreate,
  ActividadReadDetail,
  ActividadUpdate,
)


def add_tiene_bloques(
  session: Session, actividad: Actividad
) -> ActividadReadDetail:
  assert actividad.id is not None
  return ActividadReadDetail(
    id=actividad.id,
    nombre=actividad.nombre,
    is_active=actividad.is_active,
    tiene_bloques=is_exists_bloque(session, actividad.id),
  )
def buscar_actividad(session: Session, id: int) -> Actividad:
  actividad = read_actividad(session, id)
  if not actividad:
    raise ValueError('Actividad no encontrada')
  return actividad
def actualizar_actividad(
  session: Session, id: int, actividad: ActividadUpdate
) -> Actividad:
  actividad_bd = buscar_actividad(session, id)
  return update_actividad(session, actividad_bd, actividad)
def eliminar_actividad(session: Session, id: int) -> None:
  if is_exists_bloque(session, id):
    raise ValueError(
      'Una actividad con al menos un bloque relacionado no se puede eliminar'
    )
  actividad = buscar_actividad(session, id)
  delete_actividad(session, actividad)
