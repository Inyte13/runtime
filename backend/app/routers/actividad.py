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


@actividad_router.post(
  '/actividades', status_code=201, response_model=ActividadReadDetail
)
def post_actividad(session: SessionDep, actividad: ActividadCreate):
  try:
    return registrar_actividad(session, actividad)
  # Usando el unique del schema
  except IntegrityError:
    raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST, detail='El nombre ya existe'
    )
