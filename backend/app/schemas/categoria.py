import re

from pydantic import field_validator
from sqlmodel import SQLModel

from app.schemas.actividad import ActividadReadDetail, ActividadResumen

# Si cambias el #A18072, cambialo en el frontend (categoriasStore y CategoriaTemp)
class CategoriaCreate(SQLModel):
  nombre: str
  color: str = '#A18072'

  @field_validator('nombre')
  def to_lowercase_and_not_empty(cls, v: str) -> str:
    if v.strip() == '':
      raise ValueError('El nombre no puede estar vacío')
    return v.lower()
  @field_validator('color')
  def color_not_empty(cls, v: str) -> str:
    if not re.match(r'^#[0-9A-Fa-f]{6}$', v):
      raise ValueError('El color debe ser un hexadecimal válido (#RRGGBB)')
    return v

