from src.crud.bloque import read_bloques_by_range
from src.schemas.bloque import BloqueCreate
from src.services.bloque import registrar_bloque


def test_read_bloques_by_range_todos(session_temp, dia, actividad):
  registrar_bloque(
    session_temp, BloqueCreate(fecha=dia.fecha, id_actividad=actividad.id)
  )
  registrar_bloque(
    session_temp, BloqueCreate(fecha=dia.fecha, id_actividad=actividad.id)
  )
  registrar_bloque(
    session_temp, BloqueCreate(fecha=dia.fecha, id_actividad=actividad.id)
  )
  bloques = read_bloques_by_range(session_temp, dia.fecha)
  assert len(bloques) == 3


def test_read_bloques_by_range_desde(session_temp, dia, actividad):
  registrar_bloque(
    session_temp, BloqueCreate(fecha=dia.fecha, id_actividad=actividad.id)
  )
  bloque = registrar_bloque(
    session_temp, BloqueCreate(fecha=dia.fecha, id_actividad=actividad.id)
  )
  registrar_bloque(
    session_temp, BloqueCreate(fecha=dia.fecha, id_actividad=actividad.id)
  )
  bloques = read_bloques_by_range(
    session_temp, dia.fecha, hora_desde=bloque.hora
  )
  assert len(bloques) == 2


def test_read_bloques_by_range_hasta(session_temp, dia, actividad):
  registrar_bloque(
    session_temp, BloqueCreate(fecha=dia.fecha, id_actividad=actividad.id)
  )
  bloque = registrar_bloque(
    session_temp, BloqueCreate(fecha=dia.fecha, id_actividad=actividad.id)
  )
  registrar_bloque(
    session_temp, BloqueCreate(fecha=dia.fecha, id_actividad=actividad.id)
  )
  bloques = read_bloques_by_range(
    session_temp, dia.fecha, hora_hasta=bloque.hora
  )
  assert len(bloques) == 2
