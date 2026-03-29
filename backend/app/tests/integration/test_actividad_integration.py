import pytest

from app.schemas.actividad import ActividadCreate
from app.services.actividad import (
  actividad_modificada,
  buscar_actividad,
  eliminar_actividad,
  registrar_actividad,
)


