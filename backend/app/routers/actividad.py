from fastapi import APIRouter, HTTPException
from sqlalchemy.exc import IntegrityError
from starlette import status

from app.core.database import SessionDep
from app.schemas.actividad import (
  ActividadCreate,
  ActividadRead,
  ActividadReadDetail,
  ActividadUpdate,
)
from app.services.actividad import (
  actualizar_actividad,
  eliminar_actividad,
  registrar_actividad,
)

actividad_router = APIRouter(tags=['Actividades'])


