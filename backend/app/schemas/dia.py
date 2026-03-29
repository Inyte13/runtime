from datetime import date

from pydantic import field_validator
from sqlmodel import SQLModel

from app.models.dia import Estado
from app.schemas.bloque import BloqueRead
from app.schemas.categoria import CategoriaResumen

