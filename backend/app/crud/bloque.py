from datetime import date, time
from typing import Sequence

from sqlmodel import Session, col, select

from app.models.bloque import Bloque
from app.schemas.bloque import BloqueUpdate


