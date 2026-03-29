from sqlmodel import Field, Relationship, SQLModel

from app.models.actividad import Actividad


class Categoria(SQLModel, table=True):
  __table_args__ = {'sqlite_autoincrement': True}
  # Tiene que ser | None, porque sqlite le asigna el id
  # No tiene el nullable=False porque sqlite lo gestiona
  id: int | None = Field(default=None, primary_key=True)
