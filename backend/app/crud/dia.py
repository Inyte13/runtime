from datetime import date
from typing import Sequence

from sqlalchemy.orm import selectinload
from sqlmodel import Session, col, select

from app.models.actividad import Actividad
from app.models.bloque import Bloque
from app.models.dia import Dia
from app.schemas.dia import DiaUpdate


