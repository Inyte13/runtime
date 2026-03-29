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


