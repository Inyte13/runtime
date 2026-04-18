from src.crud.categoria import is_exists_actividad

def test_is_exists_actividad(session_temp, actividad, categoria):
  assert is_exists_actividad(session_temp, categoria.id)