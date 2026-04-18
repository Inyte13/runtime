from fastapi import APIRouter, HTTPException
from starlette import status

from src.core.database import SessionDep
from src.schemas.bloque import BloqueCreate, BloqueRead, BloqueUpdate
from src.services.bloque import (
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


@bloque_router.patch('/bloques/{id}', response_model=BloqueRead)
def patch_bloque(session: SessionDep, bloque: BloqueUpdate, id: int):
  try:
    return actualizar_bloque(session, id, bloque)
  except ValueError as e:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@bloque_router.delete('/bloques/{id}', status_code=204)
def delete_bloque(session: SessionDep, id: int):
  try:
    eliminar_bloque(session, id)
  except ValueError as e:
    raise HTTPException(status_code=404, detail=str(e))
