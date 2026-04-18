from datetime import date
from enum import IntEnum
from typing import TYPE_CHECKING

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
  from src.models.bloque import Bloque


class Estado(IntEnum):
  MAL = 1
  NORMAL = 2
  BIEN = 3


class Dia(SQLModel, table=True):
  fecha: date = Field(primary_key=True)
  titulo: str | None = Field(max_length=150, default=None)
  estado: Estado | None = Field(default=None)

  # Dia sabe sus bloques y Bloque no sabe nada
  bloques: list['Bloque'] = Relationship(
    sa_relationship_kwargs={
      'cascade': 'all, delete-orphan',
      # Cuando llamemos al diaDetail, traera los bloques ordenados
      'order_by': 'Bloque.hora',
    },
  )
