import pytest

from app.crud.actividad import create_actividad
from app.crud.categoria import create_categoria
from app.models.actividad import Actividad
from app.models.categoria import Categoria
from app.services.categoria import (
  buscar_categoria,
  eliminar_categoria,
  mostrar_categorias,
)


