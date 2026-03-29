from fastapi import APIRouter, HTTPException
from starlette import status

from app.core.database import SessionDep
from app.schemas.bloque import BloqueCreate, BloqueRead, BloqueUpdate
from app.services.bloque import (
  actualizar_bloque,
  eliminar_bloque,
  registrar_bloque,
)

bloque_router = APIRouter(tags=['Bloques'])


# TODO: Un get para traer los bloques para las estadisticas
@bloque_router.post('/bloques', status_code=201, response_model=BloqueRead)
def post_bloque(session: SessionDep, bloque: BloqueCreate):
  try:
    return registrar_bloque(session, bloque)
  except ValueError as e:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
