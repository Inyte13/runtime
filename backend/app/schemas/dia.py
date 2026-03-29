from datetime import date

from pydantic import field_validator
from sqlmodel import SQLModel

from app.models.dia import Estado
from app.schemas.bloque import BloqueRead
from app.schemas.categoria import CategoriaResumen

# DiaCreate? NO por que ya no valido el json que recibia POST(ya no existe)
class DiaRead(SQLModel):
  fecha: date
  titulo: str | None = None
  estado: Estado | None = None
class DiaReadDetail(DiaRead):
  bloques: list[BloqueRead]
