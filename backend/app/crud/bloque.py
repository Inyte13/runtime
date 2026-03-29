from datetime import date, time
from typing import Sequence

from sqlmodel import Session, col, select

from app.models.bloque import Bloque
from app.schemas.bloque import BloqueUpdate


def create_bloque(session: Session, bloque: Bloque) -> Bloque:
  session.add(bloque)
  session.commit()
  session.refresh(bloque)
  return bloque
