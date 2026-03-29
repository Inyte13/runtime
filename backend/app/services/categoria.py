from sqlmodel import Session

from app.crud.categoria import (
  delete_categoria,
  is_exists_actividad,
  read_categoria,
  read_categorias,
  update_categoria,
)
from app.models.categoria import Categoria
from app.schemas.categoria import CategoriaReadDetail, CategoriaUpdate
from app.services.actividad import actividad_modificada


