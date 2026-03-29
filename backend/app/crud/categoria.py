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
def is_exists_actividad(session: Session, id: int) -> bool:
  subquery = select(Actividad.id).where(Actividad.id_categoria == id).exists()
  return session.exec(select(subquery)).one()
# Lo ordenamos por orden de creacion
def read_categorias(session: Session) -> Sequence[Categoria]:
  statement = select(Categoria).order_by(col(Categoria.id))
  return session.exec(statement).all()
def update_categoria(
  session: Session, categoria_bd: Categoria, categoria: CategoriaUpdate
) -> Categoria:
  # Convertimos el input a diccionario, excluyendo los nulos
  new_categoria = categoria.model_dump(exclude_unset=True)
  # Actualizamos los atributos
  categoria_bd.sqlmodel_update(new_categoria)
  session.add(categoria_bd)
  session.commit()
  session.refresh(categoria_bd)
  return categoria_bd
