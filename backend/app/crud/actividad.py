from typing import Sequence

from sqlmodel import Session, select

from app.models.actividad import Actividad
from app.models.bloque import Bloque
from app.schemas.actividad import ActividadUpdate


def create_actividad(session: Session, actividad: Actividad) -> Actividad:
  session.add(actividad)
  session.commit()
  session.refresh(actividad)
  return actividad
def read_actividad(session: Session, id: int) -> Actividad | None:
  return session.get(Actividad, id)
def is_exists_bloque(session: Session, id: int) -> bool:
  subquery = select(Bloque.id).where(Bloque.id_actividad == id).exists()
  result = session.exec(select(subquery))
  return result.one()
