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


