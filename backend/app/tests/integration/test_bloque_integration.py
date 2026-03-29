from datetime import time

import pytest

from app.schemas.bloque import BloqueCreate, BloqueUpdate
from app.services.bloque import (
  actualizar_bloque,
  eliminar_bloque,
  registrar_bloque,
  registrar_bloque_al_inicio,
  registrar_bloque_btn,
  registrar_bloque_despues,
)
from app.utils.time import modificar_hora


def test_registrar_bloque_sin_actividad(session_temp, dia):
  with pytest.raises(ValueError):
    registrar_bloque(session_temp, BloqueCreate(fecha=dia.fecha))


def test_registrar_bloque_btn_primero(session_temp, categoria, actividad, dia):
  bloque = registrar_bloque_btn(
    session_temp, BloqueCreate(fecha=dia.fecha, id_actividad=actividad.id)
  )
  assert bloque.hora == time(0, 0)


def test_registrar_bloque_btn_despues(
  session_temp, categoria, actividad, dia, bloque
):
  bloque_2 = registrar_bloque_btn(
    session_temp, BloqueCreate(fecha=dia.fecha, id_actividad=actividad.id)
  )
  assert bloque_2.hora == bloque.hora_fin


def test_registrar_bloque_al_inicio(
  session_temp, categoria, actividad, dia, bloque
):
  hora_bloque_1 = bloque.hora_fin
  registrar_bloque_al_inicio(
    session_temp,
    BloqueCreate(fecha=dia.fecha, id_actividad=actividad.id, id_ref=0),
  )
  session_temp.refresh(bloque)
  assert bloque.hora_fin == modificar_hora(hora_bloque_1, 0.5)


def test_registrar_bloque_despues(
  session_temp, categoria, actividad, dia, bloque
):
  bloque_3 = registrar_bloque_btn(
    session_temp, BloqueCreate(fecha=dia.fecha, id_actividad=actividad.id)
  )
  bloque_2 = registrar_bloque_despues(
    session_temp,
    BloqueCreate(fecha=dia.fecha, id_actividad=actividad.id, id_ref=bloque.id),
  )
  session_temp.refresh(bloque_3)
  assert bloque_3.hora == bloque_2.hora_fin


def test_actualizar_bloque(session_temp, categoria, actividad, dia, bloque):
  bloque_2 = registrar_bloque_btn(
    session_temp, BloqueCreate(fecha=dia.fecha, id_actividad=actividad.id)
  )
  hora_bloque_2 = bloque_2.hora_fin
  actualizar_bloque(session_temp, bloque.id, BloqueUpdate(duracion=1))
  assert bloque_2.hora_fin == modificar_hora(hora_bloque_2, 0.5)


def test_eliminar_bloque(session_temp, categoria, actividad, dia, bloque):
  bloque_2 = registrar_bloque_btn(
    session_temp, BloqueCreate(fecha=dia.fecha, id_actividad=actividad.id)
  )
  eliminar_bloque(session_temp, bloque.id)
  assert bloque_2.hora == time(0, 0)
