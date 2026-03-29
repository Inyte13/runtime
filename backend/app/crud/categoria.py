from typing import Sequence

from sqlmodel import Session, col, select

from app.models.actividad import Actividad
from app.models.categoria import Categoria
from app.schemas.categoria import CategoriaUpdate


