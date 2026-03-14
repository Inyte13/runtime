from datetime import date

from pydantic import field_validator
from sqlmodel import SQLModel

from app.models.dia import Estado
from app.schemas.bloque_schema import BloqueRead, BloqueResumen

# DiaCreate? NO por que ya no valido el json que recibia POST(ya no existe)


class DiaRead(SQLModel):
  titulo: str | None = None
  estado: Estado | None = None
  fecha: date


class DiaReadDetail(DiaRead):
  bloques: list[BloqueRead]


class DiaResumen(DiaRead):
  bloques: list[BloqueResumen]  


class DiaUpdate(SQLModel):
  titulo: str | None = None
  estado: Estado | None = None

  # Validator para que el '' se convierta en None
  @field_validator('titulo')
  @classmethod
  def formatear_str_vacio(cls, v):
    if v == '':
      return None
    return v
