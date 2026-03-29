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


