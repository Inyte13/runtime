from datetime import date, time

from pydantic import field_serializer, field_validator
from sqlmodel import Field, SQLModel


# Necesita menos indicaciones porque no tiene tabla
class BloqueCreate(SQLModel):
  duracion: float = 0.5
  # TODO: Validator para que envie mas del multiplo de 0.5 o lo que escoja
  # Aquí si va porque es validación de datos, no indicaciones para la bd
  descripcion: str | None = Field(default=None, max_length=255)
  fecha: date
  # Podemos recibir None pero lo controlaremos en el backend
  id_actividad: int | None = None
  id_ref: int | None = None
  # Validator para que el '' se convierta en None
  @field_validator('descripcion')
  @classmethod
  def formatear_str_vacio(cls, v):
    if v == '':
      return None
    return v

