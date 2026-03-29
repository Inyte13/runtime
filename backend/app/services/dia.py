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
def actualizar_dia(session: Session, fecha: date, dia: DiaUpdate) -> Dia:
  # No se utiliza buscar_dia, por que controlamos si no existe
  dia_bd = read_dia(session, fecha)
  # UPSERT: Si no existe lo creamos
  if not dia_bd:
    # Solo usa los campos que se declararon
    datos = dia.model_dump(exclude_unset=True)
    # KWARGS: Granularmente actualiza los campos que sobrevivieron
    new_dia = Dia(fecha=fecha, **datos)
    return create_dia(session, new_dia)
  # Si ya existe actualizamos normal
  return update_dia(session, dia_bd, dia)
# Cuando yo armo la lista es list[Bloque]
def recalcular_horas(
  session: Session, fecha: date, ids: list[int]
) -> list[Bloque]:

  bloques = read_bloques_by_range(session, fecha)
  # Sacamos los id y lo convertimos a set para comparar con los que nos viene
  if {bloque.id for bloque in bloques} != set(ids):
    raise ValueError('Los bloques no coinciden')

  # Dict para búsqueda rapida
  bloques_dict = {bloque.id: bloque for bloque in bloques}

  hora_temp = datetime.combine(fecha, time(0, 0))

  bloques_actualizados = []
  for id in ids:
    bloque = bloques_dict[id]
    bloque.hora = hora_temp.time()
    # Le sumamos la duracion al temp
    hora_temp += timedelta(hours=bloque.duracion)
    # Le asignamos: hora_fin = hora_temp + duracion
    bloque.hora_fin = hora_temp.time()
    session.add(bloque)
    bloques_actualizados.append(bloque)
  session.commit()
  return bloques_actualizados
def eliminar_dia(session: Session, fecha: date) -> None:
  dia = buscar_dia(session, fecha)
  delete_dia(session, dia)
