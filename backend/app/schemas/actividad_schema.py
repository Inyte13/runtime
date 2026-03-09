import re

from pydantic import field_validator
from sqlmodel import SQLModel


class ActividadCreate(SQLModel):
  nombre: str
  color: str

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


class ActividadRead(SQLModel):
  id: int
  nombre: str
  color: str


class ActividadReadDetail(ActividadRead):
  is_active: bool
  tiene_bloques: bool


class ActividadUpdate(SQLModel):
  nombre: str | None = None
  color: str | None = None
  is_active: bool | None = None

  @field_validator('nombre')
  def to_lowercase_and_not_empty(cls, v: str | None) -> str | None:
    if v is not None:
      if v.strip() == '':
        raise ValueError('El nombre no puede estar vacío')
      return v.lower()
    return v

  @field_validator('color')
  def color_not_empty(cls, v: str) -> str:
    if not re.match(r'^#[0-9A-Fa-f]{6}$', v):
      raise ValueError('El color debe ser un hexadecimal válido (#RRGGBB)')
    return v
