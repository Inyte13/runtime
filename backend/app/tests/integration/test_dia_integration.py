from datetime import date, time

import pytest

from app.crud.actividad import create_actividad
from app.crud.categoria import create_categoria
from app.models.actividad import Actividad
from app.models.categoria import Categoria
from app.schemas.bloque import BloqueCreate
from app.schemas.dia import DiaUpdate
from app.services.bloque import registrar_bloque
from app.services.dia import (
  actualizar_dia,
  buscar_dia,
  mostrar_dias,
  recalcular_horas,
  resumen_dia,
)


