from datetime import date

from fastapi import APIRouter, Body, HTTPException
from starlette import status

from src.core.database import PathDate, QueryDate, SessionDep
from src.schemas.bloque import BloqueRead
from src.schemas.dia import DiaRead, DiaReadDetail, DiaResumen, DiaUpdate
from src.services.dia import (
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
def get_dias_resumen(session: SessionDep, inicio: QueryDate, final: QueryDate):
  try:
    dias = mostrar_dias(session, inicio, final)
    return [resumen_dia(session, dia) for dia in dias]
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
