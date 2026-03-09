from typing import Sequence

from sqlmodel import Session, select

from app.models.actividad import Actividad
from app.models.bloque import Bloque
from app.schemas.actividad_schema import ActividadUpdate


def create_actividad(session: Session, actividad: Actividad) -> Actividad:
  session.add(actividad)
  session.commit()
  session.refresh(actividad)
  return actividad


def read_actividad(session: Session, id: int) -> Actividad | None:
  return session.get(Actividad, id)


def is_exists_bloque(session: Session, id: int) -> bool:
  # exists, existe al menos uno?
  subquery = select(Bloque.id).where(Bloque.id_actividad == id).exists()
  result = session.exec(select(subquery))
  return result.one()


) -> Sequence[Actividad]:
  return session.exec(statement).all()


def update_actividad(
  session: Session, actividad_bd: Actividad, actividad: ActividadUpdate
) -> Actividad:
  # Convertimos el input a diccionario, excluyendo los nulos
  new_actividad = actividad.model_dump(exclude_unset=True)
  # Actualizamos los atributos
  actividad_bd.sqlmodel_update(new_actividad)
  session.add(actividad_bd)
  session.commit()
  session.refresh(actividad_bd)
  return actividad_bd


def delete_actividad(session: Session, actividad: Actividad) -> None:
  session.delete(actividad)
  session.commit()
