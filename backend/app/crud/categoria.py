from typing import Sequence

from sqlmodel import Session, col, select

from app.models.actividad import Actividad
from app.models.categoria import Categoria
from app.schemas.categoria import CategoriaUpdate


def create_categoria(session: Session, categoria: Categoria) -> Categoria:
  session.add(categoria)
  session.commit()
  session.refresh(categoria)
  return categoria
def read_categoria(session: Session, id: int) -> Categoria | None:
  return session.get(Categoria, id)
