from sqlmodel import Session

from app.crud.actividad_crud import (
  delete_actividad,
  is_exists_bloque,
  read_actividad,
  read_actividades,
  update_actividad,
)
from app.models.actividad import Actividad
from app.schemas.actividad_schema import (
  ActividadReadDetail,
  ActividadUpdate,
)


def _validar_nombre_unico(session: Session, nombre: str) -> None:
  if search_actividad_by_nombre(session, nombre):
    raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST,
      detail='Ya existe una actividad con ese nombre',
    )
  return


def buscar_actividad(session: Session, id: int) -> Actividad:
  # Leemos la actividad con la fx de actividad_crud, sino existe devuelve None
  actividad = read_actividad_by_id(session, id)
  if not actividad:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND, detail='Actividad no encontrada'
    )
  return actividad


def mostrar_actividades(
  session: Session, is_active: bool | None = None
) -> list[ActividadReadDetail]:
  actividades = read_actividades(session, is_active)
  return [
    ActividadReadDetail(
      **actividad.model_dump(),
      # actividad.id nunca sera none por mi backend
      tiene_bloques=is_exists_bloque(session, actividad.id),  # type: ignore
    )
    for actividad in actividades
  ]


def actualizar_actividad(
  session, id: int, actividad: ActividadUpdate
) -> Actividad:
  actividad_bd = buscar_actividad(session, id)
  # Valido si el nombre existe y si es diferente al nombre original
  if actividad.nombre and actividad.nombre != actividad_bd.nombre:
    _validar_nombre_unico(session, actividad.nombre)
  return update_actividad(session, actividad_bd, actividad)


def eliminar_actividad(session: Session, id: int) -> None:
  actividad = buscar_actividad(session, id)
  delete_actividad(session, actividad)
  return
