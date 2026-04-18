from src.crud.actividad import is_exists_bloque


def test_is_exists_bloque(session_temp, bloque, actividad):
  assert is_exists_bloque(session_temp, actividad.id)