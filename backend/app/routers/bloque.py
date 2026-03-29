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


