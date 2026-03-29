import pytest

from app.schemas.actividad import ActividadCreate
from app.services.actividad import (
  actividad_modificada,
  buscar_actividad,
  eliminar_actividad,
  registrar_actividad,
)


def test_actividad_modificada_sin_bloques(session_temp, actividad):
  actividad = actividad_modificada(session_temp, actividad)
  assert not actividad.tiene_bloques


def test_actividad_modificada_con_bloques(session_temp, actividad, bloque):
  actividad = actividad_modificada(session_temp, actividad)
  assert actividad.tiene_bloques


def test_eliminar_actividad_con_bloques(session_temp, actividad, bloque):
  with pytest.raises(ValueError):
    eliminar_actividad(session_temp, actividad.id)


def test_eliminar_actividad_sin_bloques(session_temp, categoria, actividad):
  eliminar_actividad(session_temp, actividad.id)
  with pytest.raises(ValueError):
    buscar_actividad(session_temp, actividad.id)


def test_registrar_actividad(session_temp, categoria):
  actividad = registrar_actividad(
    session_temp,
    ActividadCreate(nombre='entretenimiento', id_categoria=categoria.id),
  )
  assert not actividad.tiene_bloques
