from datetime import date, datetime

from fastapi import APIRouter, Body, HTTPException, Query
from starlette import status

from app.core.database import PathDate, QueryDate, SessionDep
from app.schemas.bloque_schema import BloqueRead
from app.schemas.dia_schema import DiaRead, DiaReadDetail, DiaResumen, DiaUpdate
from app.services.dia_services import (
  actualizar_dia,
  buscar_dia,
  buscar_dia_detail,
  eliminar_dia,
  mostrar_dias,
  recalcular_horas,
  resumen_dia,
)

dia_router = APIRouter(tags=['Dia'])


# GET: Dia básico o detail
@dia_router.get('/dias/{fecha}', response_model=DiaReadDetail | DiaRead)
def get_dia(
  session: SessionDep,
  fecha: PathDate,
  detail: bool = False,
):
  try:
    if detail:
      dia_db = buscar_dia_detail(session, fecha)
      return DiaReadDetail.model_validate(dia_db)
    dia_db = buscar_dia(session, fecha)
    return DiaRead.model_validate(dia_db)
  except ValueError as e:
    raise HTTPException(status_code=404, detail=str(e))


# GET: Dias mes entre un rango de fechas incluyendo al inicio y al final
@dia_router.get('/dias', response_model=list[DiaResumen])
def get_dias_resumen_range(
  session: SessionDep,
  inicio: QueryDate,
  final: QueryDate
):
  try:
    dias = mostrar_dias(session, inicio, final)
    return [resumen_dia(dia) for dia in dias]
  except ValueError as e:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


# POST? NO, se supone que 'todos' los dias ya están creados solo falta actualizarlos


# PATCH: Si 'actualiza' el titulo o el estado y si el dia no existe lo crear automaticamente
@dia_router.patch('/dias/{fecha}', response_model=DiaRead)
def patch_dia(
  session: SessionDep,
  dia: DiaUpdate,
  fecha: PathDate,
):
  try:
    return actualizar_dia(session, fecha, dia)
  except ValueError as e:
    raise HTTPException(status_code=404, detail=str(e))


# PATCH: Con las duraciones hago coincidir hora y hora_fin
@dia_router.patch('/dias/{fecha}/reordenar', response_model=list[BloqueRead])
def recalculate_hours(
  session: SessionDep, fecha: date, ids: list[int] = Body(...)
):
  try:
    # ids: Lista de el nuevo orden enviado por el frontend
    return recalcular_horas(session, fecha, ids)
  except ValueError as e:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


# DELETE: Elimina el dia y los bloques que esten dentro
@dia_router.delete('/dias/{fecha}', status_code=204)
def delete_dia(session: SessionDep, fecha: PathDate):
  try:
    eliminar_dia(session, fecha)
  except ValueError as e:
    raise HTTPException(status_code=404, detail=str(e))
