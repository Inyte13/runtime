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


def test_mostrar_categorias(session_temp):
  categoria = create_categoria(
    session_temp, Categoria(nombre='entretenimiento')
  )
  create_categoria(session_temp, Categoria(nombre='salir a la calle'))
  assert categoria.id is not None
  create_actividad(
    session_temp, Actividad(nombre='reels', id_categoria=categoria.id)
  )
  categorias = mostrar_categorias(session_temp)
  assert len(categorias[0].actividades) == 1
  assert len(categorias[1].actividades) == 0


def test_eliminar_categoria_con_actividades(session_temp, actividad, categoria):
  with pytest.raises(ValueError):
    eliminar_categoria(session_temp, categoria.id)


def test_eliminar_categoria_sin_actividades(session_temp, categoria):
  eliminar_categoria(session_temp, categoria.id)
  with pytest.raises(ValueError):
    buscar_categoria(session_temp, categoria.id)
