from typing import Sequence

from sqlmodel import Session, select

from app.models.actividad import Actividad
from app.models.bloque import Bloque
from app.schemas.actividad import ActividadUpdate


