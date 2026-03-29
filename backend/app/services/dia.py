from datetime import date, datetime, time, timedelta
from typing import Sequence

from sqlmodel import Session

from app.crud.bloque import read_bloques_by_range
from app.crud.dia import (
  create_dia,
  delete_dia,
  read_bloques_resumen,
  read_dia,
  read_dia_detail,
  read_dias_resumen,
  update_dia,
)
from app.models.bloque import Bloque
from app.models.dia import Dia
from app.schemas.actividad import ActividadResumen
from app.schemas.categoria import CategoriaResumen
from app.schemas.dia import DiaResumen, DiaUpdate


