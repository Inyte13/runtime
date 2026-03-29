from sqlmodel import Field, SQLModel


class Actividad(SQLModel, table=True):
  __table_args__ = {'sqlite_autoincrement': True}
  # Tiene que ser | None, porque sqlite le asigna el id
  # No tiene el nullable=False porque sqlite lo gestiona
  id: int | None = Field(default=None, primary_key=True)
  nombre: str = Field(unique=True, max_length=50, nullable=False)
  is_active: bool = Field(default=True, nullable=False)
  # Tenemos id_actividad a pesar de tener actividad porque es FK
  id_categoria: int = Field(foreign_key='categoria.id', nullable=False)
