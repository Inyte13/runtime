from datetime import date, time

import pytest

from app.crud.actividad import create_actividad
from app.crud.categoria import create_categoria
from app.models.actividad import Actividad
from app.models.categoria import Categoria
from app.schemas.bloque import BloqueCreate
from app.schemas.dia import DiaUpdate
from app.services.bloque import registrar_bloque
from app.services.dia import (
  actualizar_dia,
  buscar_dia,
  mostrar_dias,
  recalcular_horas,
  resumen_dia,
)


def test_mostrar_dias_fechas_invertidas(session_temp):
  with pytest.raises(ValueError):
    mostrar_dias(session_temp, date(2026, 2, 1), date(2026, 1, 1))


def test_mostrar_dias_fechas_iguales(session_temp):
  with pytest.raises(ValueError):
    mostrar_dias(session_temp, date(2026, 1, 1), date(2026, 1, 1))


def test_mostrar_dias_mas_de_un_año(session_temp):
  with pytest.raises(ValueError):
    mostrar_dias(session_temp, date(2026, 1, 1), date(2027, 2, 1))


def test_resumen_dia_orden(session_temp, dia):
  categoria_2 = create_categoria(
    session_temp, Categoria(nombre='entretenimiento')
  )
  categoria_1 = create_categoria(
    session_temp, Categoria(nombre='salir a la calle')
  )
  assert categoria_1.id is not None and categoria_2.id is not None
  actividad_1 = create_actividad(
    session_temp, Actividad(nombre='transporte', id_categoria=categoria_1.id)
  )
  actividad_2 = create_actividad(
    session_temp, Actividad(nombre='parque', id_categoria=categoria_1.id)
  )
  actividad_3 = create_actividad(
    session_temp, Actividad(nombre='jugar', id_categoria=categoria_2.id)
  )
  actividad_4 = create_actividad(
    session_temp, Actividad(nombre='reels', id_categoria=categoria_2.id)
  )
  assert (
    actividad_1.id is not None
    and actividad_2.id is not None
    and actividad_3.id is not None
    and actividad_4.id is not None
  )
  registrar_bloque(
    session_temp,
    BloqueCreate(fecha=dia.fecha, id_actividad=actividad_2.id, duracion=3),
  )
  registrar_bloque(
    session_temp,
    BloqueCreate(fecha=dia.fecha, id_actividad=actividad_1.id, duracion=2),
  )
  registrar_bloque(
    session_temp,
    BloqueCreate(fecha=dia.fecha, id_actividad=actividad_4.id, duracion=1.5),
  )
  registrar_bloque(
    session_temp,
    BloqueCreate(fecha=dia.fecha, id_actividad=actividad_3.id, duracion=1),
  )
  resumen = resumen_dia(session_temp, dia)
  # Categoria 1 llega primero (bloque_1 es el primero registrado)
  assert resumen.categorias[0].id == categoria_1.id
  assert resumen.categorias[0].actividades[0].id == actividad_2.id  # duracion 3
  assert resumen.categorias[0].actividades[0].duracion == 3
  assert resumen.categorias[0].actividades[1].id == actividad_1.id  # duracion 2
  assert resumen.categorias[0].actividades[1].duracion == 2

  # Categoria 2 llega segunda (bloque_3 es el tercero)
  assert resumen.categorias[1].id == categoria_2.id
  assert (
    resumen.categorias[1].actividades[0].id == actividad_4.id
  )  # duracion 1.5
  assert resumen.categorias[1].actividades[0].duracion == 1.5
  assert resumen.categorias[1].actividades[1].id == actividad_3.id  # duracion 1
  assert resumen.categorias[1].actividades[1].duracion == 1


def test_actualizar_dia(session_temp):
  actualizar_dia(session_temp, date.today(), DiaUpdate(titulo='Día de mierda'))
  dia = buscar_dia(session_temp, date.today())
  assert dia.titulo == 'Día de mierda'


def test_recalcular_horas_ids_no_coinciden(
  session_temp, categoria, actividad, dia, bloque
):
  registrar_bloque(
    session_temp, BloqueCreate(fecha=dia.fecha, id_actividad=actividad.id)
  )
  with pytest.raises(ValueError):
    recalcular_horas(session_temp, dia.fecha, [2, 3])


def test_recalcular_horas(session_temp, categoria, actividad, dia, bloque):
  bloque_2 = registrar_bloque(
    session_temp,
    BloqueCreate(fecha=dia.fecha, id_actividad=actividad.id, duracion=1),
  )
  bloque_3 = registrar_bloque(
    session_temp,
    BloqueCreate(fecha=dia.fecha, id_actividad=actividad.id, duracion=2),
  )
  assert bloque_2.id is not None and bloque_3.id is not None
  recalcular_horas(
    session_temp, dia.fecha, [bloque_3.id, bloque.id, bloque_2.id]
  )
  assert bloque_3.hora == time(0, 0)
  assert bloque_3.hora_fin == time(2, 0)
  assert bloque.hora == time(2, 0)
  assert bloque.hora_fin == time(2, 30)
  assert bloque_2.hora == time(2, 30)
  assert bloque_2.hora_fin == time(3, 30)
