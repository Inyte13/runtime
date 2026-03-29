from datetime import time
from typing import Sequence

from sqlmodel import Session

from app.crud.bloque import (
  create_bloque,
  delete_bloque,
  read_bloque,
  read_bloques_by_range,
  ultimo_bloque,
  update_bloque,
)
from app.crud.dia import create_dia, read_dia
from app.models.bloque import Bloque
from app.models.dia import Dia
from app.schemas.bloque import BloqueCreate, BloqueUpdate
from app.services.actividad import validar_actividad
from app.utils.time import modificar_hora, validar_hora_granulidad


def _modificar_horas(
  session: Session, bloques: Sequence[Bloque], diferencia: float
) -> None:
  for bloque in bloques:
    bloque.hora = modificar_hora(bloque.hora, diferencia)
    if bloque.duracion is not None:
      bloque.hora_fin = modificar_hora(bloque.hora, bloque.duracion)
    session.add(bloque)
def buscar_bloque(session: Session, id: int) -> Bloque:
  bloque = read_bloque(session, id)
  if not bloque:
    raise ValueError('No se encontró el bloque')
  return bloque
