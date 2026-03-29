from datetime import date

from fastapi import APIRouter, Body, HTTPException
from starlette import status

from app.core.database import PathDate, QueryDate, SessionDep
from app.schemas.bloque import BloqueRead
from app.schemas.dia import DiaRead, DiaReadDetail, DiaResumen, DiaUpdate
from app.services.dia import (
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
