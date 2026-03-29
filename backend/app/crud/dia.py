from datetime import date
from typing import Sequence

from sqlalchemy.orm import selectinload
from sqlmodel import Session, col, select

from app.models.actividad import Actividad
from app.models.bloque import Bloque
from app.models.dia import Dia
from app.schemas.dia import DiaUpdate


def read_dia(session: Session, fecha: date) -> Dia | None:
  return session.get(Dia, fecha)
def read_dia_detail(session: Session, fecha: date) -> Dia | None:
  statement = (
    select(Dia)
    .where(Dia.fecha == fecha)
    # Para hacerlo en una solo query
    # Evita error de lazy loading al acceder a dia.bloques fuera de la sesión
    .options(selectinload(Dia.bloques))  # type: ignore
  )
  # Devuelve el cursor/iterable, el firstlo convierte en un Objeto Dia
  return session.exec(statement).first()
def read_dias_resumen(
  session: Session, inicio: date, final: date
) -> Sequence[Dia]:
  statement = (
    select(Dia)
    .where(inicio <= Dia.fecha)
    .where(Dia.fecha <= final)
    .order_by(col(Dia.fecha))
    # Para hacerlo en una solo query
    # Evita error de lazy loading al acceder a dia.bloques fuera de la sesión
    .options(selectinload(Dia.bloques))  # type: ignore
  )
  return session.exec(statement).all()
ACTIVIDADES_IGNORADAS = [6]
# Ignoramos id=6, harcodeado, actividad 'Dormir'
def read_bloques_resumen(
  session: Session, fecha: date
) -> Sequence[tuple[int, float, str | None, int]]:
  statement = (
    select(
      Bloque.id_actividad,
      Bloque.duracion,
      Bloque.descripcion,
      Actividad.id_categoria,
    )
    .join(Actividad)
    .where(Bloque.fecha == fecha)
    .where(col(Actividad.id).notin_(ACTIVIDADES_IGNORADAS))
  )
  return session.exec(statement).all()
