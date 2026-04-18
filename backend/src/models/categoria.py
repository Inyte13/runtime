from sqlmodel import Field, Relationship, SQLModel

from src.models.actividad import Actividad


class Categoria(SQLModel, table=True):
  __table_args__ = {'sqlite_autoincrement': True}
  # Tiene que ser | None, porque sqlite le asigna el id
  # No tiene el nullable=False porque sqlite lo gestiona
  id: int | None = Field(default=None, primary_key=True)
  nombre: str = Field(unique=True, max_length=50, nullable=False)
  # Si cambias el #A18072, cambialo en el frontend (categoriasStore y CategoriaTemp)
  color: str = Field(max_length=7, default='#A18072', nullable=False)

  # No tienen el nullable=False porque son Relationship

  actividades: list['Actividad'] = Relationship()
