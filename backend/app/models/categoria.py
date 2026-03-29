from sqlmodel import Field, Relationship, SQLModel

from app.models.actividad import Actividad


class Categoria(SQLModel, table=True):
  __table_args__ = {'sqlite_autoincrement': True}
