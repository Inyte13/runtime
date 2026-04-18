from sqlmodel import Session

from src.crud.categoria import (
  delete_categoria,
  is_exists_actividad,
  read_categoria,
  read_categorias,
  update_categoria,
)
from src.models.categoria import Categoria
from src.schemas.categoria import CategoriaReadDetail, CategoriaUpdate
from src.services.actividad import add_tiene_bloques


def buscar_categoria(session: Session, id: int) -> Categoria:
  categoria = read_categoria(session, id)
  if not categoria:
    raise ValueError('Categoria no encontrada')
  return categoria


# Le agregamos el el 'tiene_bloques'
def mostrar_categorias(session: Session) -> list[CategoriaReadDetail]:
  categorias = read_categorias(session)
  new_categorias = []
  for categoria in categorias:
    assert categoria.id is not None
    new_categorias.append(
      CategoriaReadDetail(
        id=categoria.id,
        nombre=categoria.nombre,
        color=categoria.color,
        actividades=[
          add_tiene_bloques(session, actividad)
          for actividad in categoria.actividades
        ],
      )
    )
  return new_categorias


def actualizar_categoria(
  session: Session, id: int, categoria: CategoriaUpdate
) -> Categoria:
  categoria_bd = buscar_categoria(session, id)
  return update_categoria(session, categoria_bd, categoria)


def eliminar_categoria(session: Session, id: int) -> None:
  if is_exists_actividad(session, id):
    raise ValueError(
      'Una categoria con al menos una actividad relacionada no se puede eliminar'
    )
  categoria = buscar_categoria(session, id)
  delete_categoria(session, categoria)
