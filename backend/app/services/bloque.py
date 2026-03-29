from datetime import time
from typing import Sequence

from sqlmodel import Session

from app.crud.bloque import (
  create_bloque,
  delete_bloque,
  read_bloque,
  read_bloques_by_range,
  ultimo_bloque,
  update_bloque,
)
from app.crud.dia import create_dia, read_dia
from app.models.bloque import Bloque
from app.models.dia import Dia
from app.schemas.bloque import BloqueCreate, BloqueUpdate
from app.services.actividad import validar_actividad
from app.utils.time import modificar_hora, validar_hora_granulidad


def _modificar_horas(
  session: Session, bloques: Sequence[Bloque], diferencia: float
) -> None:
  for bloque in bloques:
    bloque.hora = modificar_hora(bloque.hora, diferencia)
    if bloque.duracion is not None:
      bloque.hora_fin = modificar_hora(bloque.hora, bloque.duracion)
    session.add(bloque)
def buscar_bloque(session: Session, id: int) -> Bloque:
  bloque = read_bloque(session, id)
  if not bloque:
    raise ValueError('No se encontró el bloque')
  return bloque
def registrar_bloque(session: Session, bloque: BloqueCreate) -> Bloque:
  # Patrón Get or Create
  # No usamos buscar_dia para controlar cuando no existe
  dia = read_dia(session, bloque.fecha)
  if not dia:
    dia = create_dia(session, Dia(fecha=bloque.fecha))

  # Si el usuario manda o la actividad con id 9 'Empty'
  if bloque.id_actividad:
    validar_actividad(session, bloque.id_actividad)
  else:
    validar_actividad(session, 9)
    bloque.id_actividad = 9
  # Para el button de ListaBloques
  if bloque.id_ref is None:
    return registrar_bloque_btn(session, bloque)
  # Cuando cree con alt en el primer bloque
  if bloque.id_ref == 0:
    # Insertar al inicio
    return registrar_bloque_al_inicio(session, bloque)
  # Si existe el id_ref del 'creador'
  return registrar_bloque_despues(session, bloque)
def registrar_bloque_btn(session: Session, bloque: BloqueCreate) -> Bloque:
  assert bloque.id_actividad is not None
  ultimo = ultimo_bloque(session, bloque.fecha)
  # Si es el primer bloque usa el 00:00 sino la hora_fin del ultimo
  hora = ultimo.hora_fin if ultimo else time(0, 0)
  validar_hora_granulidad(hora)
  new_bloque = Bloque(
    fecha=bloque.fecha,
    duracion=bloque.duracion,
    descripcion=bloque.descripcion,
    hora=hora,
    id_actividad=bloque.id_actividad,
    hora_fin=modificar_hora(hora, bloque.duracion),
  )
  return create_bloque(session, new_bloque)
def registrar_bloque_al_inicio(
  session: Session, bloque: BloqueCreate
) -> Bloque:
  assert bloque.id_actividad is not None
  new_bloque = Bloque(
    fecha=bloque.fecha,
    duracion=bloque.duracion,
    descripcion=bloque.descripcion,
    hora=time(0, 0),
    id_actividad=bloque.id_actividad,
    hora_fin=modificar_hora(time(0, 0), bloque.duracion),
  )
  bloque_bd = create_bloque(session, new_bloque)
  siguientes = read_bloques_by_range(
    session, bloque.fecha, hora_desde=time(0, 0)
  )
  # Cogemos los siguientes pero sin el creado
  siguientes = [b for b in siguientes if b.id != bloque_bd.id]
  _modificar_horas(session, siguientes, bloque.duracion)
  session.commit()
  return bloque_bd
def registrar_bloque_despues(session: Session, bloque: BloqueCreate) -> Bloque:
  assert bloque.id_actividad is not None
  assert bloque.id_ref is not None
  bloque_ref = buscar_bloque(session, bloque.id_ref)
  hora = bloque_ref.hora_fin
  validar_hora_granulidad(hora)
  new_bloque = Bloque(
    fecha=bloque.fecha,
    duracion=bloque.duracion,
    descripcion=bloque.descripcion,
    hora=hora,
    id_actividad=bloque.id_actividad,
    hora_fin=modificar_hora(hora, bloque.duracion),
  )
  bloque_bd = create_bloque(session, new_bloque)
  # Si lo incluimos porque hora es la hora_fin o sea la hora de inicio de los siguientes
  siguientes = read_bloques_by_range(session, bloque.fecha, hora_desde=hora)
  # Cogemos los siguientes pero sin el creado
  siguientes = [b for b in siguientes if b.id != bloque_bd.id]
  _modificar_horas(session, siguientes, new_bloque.duracion)
  session.commit()
  return bloque_bd
