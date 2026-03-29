from pydantic import field_validator
from sqlmodel import SQLModel


class ActividadCreate(SQLModel):
  nombre: str
  id_categoria: int
class ActividadRead(SQLModel):
  id: int
  nombre: str
  is_active: bool
class ActividadReadDetail(ActividadRead):
  tiene_bloques: bool
