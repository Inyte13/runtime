from fastapi import APIRouter, HTTPException
from sqlalchemy.exc import IntegrityError
from starlette import status

from app.core.database import SessionDep
from app.crud.categoria import create_categoria
from app.models.categoria import Categoria
from app.schemas.categoria import (
  CategoriaCreate,
  CategoriaRead,
  CategoriaReadDetail,
  CategoriaUpdate,
)
from app.services.categoria import (
  actualizar_categoria,
  eliminar_categoria,
  mostrar_categorias,
)

categoria_router = APIRouter(tags=['Categorias'])


@categoria_router.get('/categorias', response_model=list[CategoriaReadDetail])
def get_categorias(session: SessionDep):
  return mostrar_categorias(session)


@categoria_router.post(
  '/categorias', status_code=201, response_model=CategoriaReadDetail
)
def post_categoria(session: SessionDep, categoria: CategoriaCreate):
  try:
    return create_categoria(session, Categoria.model_validate(categoria))
  # Usando el unique del schema
  except IntegrityError:
    raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST, detail='El nombre ya existe'
    )


@categoria_router.patch('/categorias/{id}', response_model=CategoriaRead)
def patch_actividad(session: SessionDep, categoria: CategoriaUpdate, id: int):
  try:
    return actualizar_categoria(session, id, categoria)
  except ValueError as e:
    raise HTTPException(status_code=404, detail=str(e))
  # Usando el unique del schema
  except IntegrityError:
    raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST, detail='El nombre ya existe'
    )


@categoria_router.delete('/categorias/{id}', status_code=204)
def delete_categoria(session: SessionDep, id: int):
  try:
    eliminar_categoria(session, id)
  except ValueError as e:
    raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(e))
