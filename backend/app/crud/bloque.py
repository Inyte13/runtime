from datetime import date, time
from typing import Sequence

from sqlmodel import Session, col, desc, select

from app.models.bloque import Bloque
from app.schemas.bloque import BloqueUpdate


def ultimo_bloque(session: Session, fecha) -> Bloque | None:
  statement = (
    select(Bloque).where(Bloque.fecha == fecha).order_by(desc(Bloque.hora))
  )
  return session.exec(statement).first()


def create_bloque(session: Session, bloque: Bloque) -> Bloque:
  session.add(bloque)
  session.commit()
  session.refresh(bloque)
  return bloque


def read_bloque(session: Session, id: int) -> Bloque | None:
  return session.get(Bloque, id)


def read_bloques_by_range(
  session: Session,
  fecha: date,
  hora_desde: time | None = None,
  hora_hasta: time | None = None,
) -> Sequence[Bloque]:
  statement = (
    select(Bloque).where(Bloque.fecha == fecha).order_by(col(Bloque.hora))
  )
  if hora_desde is not None:
    statement = statement.where(Bloque.hora >= hora_desde)
  if hora_hasta is not None:
    statement = statement.where(Bloque.hora <= hora_hasta)
  return session.exec(statement).all()


def update_bloque(
  session: Session, bloque_bd: Bloque, bloque: BloqueUpdate
) -> Bloque:
  # Convertimos el input a diccionario, excluyendo los nulos
  new_bloque = bloque.model_dump(exclude_unset=True)
  # Actualizamos los atributos
  bloque_bd.sqlmodel_update(new_bloque)
  session.add(bloque_bd)
  session.commit()
  session.refresh(bloque_bd)
  return bloque_bd


def delete_bloque(session: Session, bloque: Bloque) -> None:
  session.delete(bloque)
  session.commit()
