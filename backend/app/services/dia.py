from datetime import date, datetime, time, timedelta
from typing import Sequence

from sqlmodel import Session

from app.crud.bloque import read_bloques_by_range
from app.crud.dia import (
  create_dia,
  delete_dia,
  read_bloques_resumen,
  read_dia,
  read_dia_detail,
  read_dias_resumen,
  update_dia,
)
from app.models.bloque import Bloque
from app.models.dia import Dia
from app.schemas.actividad import ActividadResumen
from app.schemas.categoria import CategoriaResumen
from app.schemas.dia import DiaResumen, DiaUpdate


def buscar_dia(session: Session, fecha: date) -> Dia:
  dia = read_dia(session, fecha)
  if not dia:
    raise ValueError('No se encontró el día')
  return dia
def buscar_dia_detail(session: Session, fecha: date) -> Dia:
  dia = read_dia_detail(session, fecha)
  if not dia:
    raise ValueError('No se encontró el día completo')
  return dia
# Cuando SQLAlchemy devuelve es sequence Sequence[Dia]
def mostrar_dias(session: Session, inicio: date, final: date) -> Sequence[Dia]:
  if final < inicio:
    raise ValueError('La fecha final debe ser mayor que la inicial')
  # Si quieres buscar un día mejor hazlo con buscar_dia
  if final == inicio:
    raise ValueError('Las fechas no pueden ser iguales')
  # Solo se puede mostrar máximo 1 año
  if (final - inicio).days > 365:
    raise ValueError('El intervalo no puede ser mayor a 1 año')
  return read_dias_resumen(session, inicio, final)
def resumen_dia(session: Session, dia: Dia) -> DiaResumen:
  bloques_resumen = read_bloques_resumen(session, dia.fecha)
  categorias: dict[int, CategoriaResumen] = {}
  actividades: dict[int, ActividadResumen] = {}
  for id_actividad, duracion, descripcion, id_categoria in bloques_resumen:
    if id_categoria not in categorias:
      categorias[id_categoria] = CategoriaResumen(
        id=id_categoria, actividades=[]
      )
    if id_actividad not in actividades:
      actividad = ActividadResumen(
        id=id_actividad,
        duracion=duracion,
        descripciones=[descripcion] if descripcion else [],
      )
      actividades[id_actividad] = actividad
      categorias[id_categoria].actividades.append(actividad)
    else:
      actividades[id_actividad].duracion += duracion
      if descripcion:
        actividades[id_actividad].descripciones.append(descripcion)
  # Orden ascendente de las actividades
  for categoria in categorias.values():
    categoria.actividades.sort(key=lambda a: a.duracion, reverse=True)

  return DiaResumen(
    fecha=dia.fecha,
    titulo=dia.titulo,
    estado=dia.estado,
    categorias=list(categorias.values()),
  )
