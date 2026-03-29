from datetime import date

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.pool import StaticPool
from sqlmodel import Session, SQLModel

from app.core.database import get_session
from app.crud.actividad import create_actividad
from app.crud.categoria import create_categoria
from app.crud.dia import create_dia
from app.main import app
from app.models.actividad import Actividad
from app.models.categoria import Categoria
from app.models.dia import Dia
from app.schemas.bloque import BloqueCreate
from app.services.bloque import registrar_bloque

engine_temp = create_engine(
  'sqlite:///:memory:',
  connect_args={'check_same_thread': False},
  poolclass=StaticPool,  # Reutiliza la BD de la memoria
  echo=False,
)


# Fixture, para test que necesitan sesión directa a la BD (unit/integration)
@pytest.fixture
def session_temp():
  # Crea las tablas
  SQLModel.metadata.create_all(engine_temp)
  with Session(engine_temp) as session:
    yield session
  # Elimina las tablas al acabar
  SQLModel.metadata.drop_all(engine_temp)


# Fixture para test endpoint
@pytest.fixture
def client():
  SQLModel.metadata.create_all(engine_temp)

  # Sobreescribe el get_session con el temp
  def override_get_session():
    with Session(engine_temp) as session:
      yield session

  # usamos la BD temporal
  app.dependency_overrides[get_session] = override_get_session
  client = TestClient(app)
  yield client
  app.dependency_overrides.clear()
  SQLModel.metadata.drop_all(engine_temp)


@pytest.fixture
def categoria(session_temp):
  return create_categoria(session_temp, Categoria(nombre='entretenimiento'))


@pytest.fixture
def actividad(session_temp, categoria):
  assert categoria.id is not None
  return create_actividad(
    session_temp,
    Actividad(nombre='reels', id_categoria=categoria.id),
  )


@pytest.fixture
def dia(session_temp):
  return create_dia(session_temp, Dia(fecha=date.today()))


@pytest.fixture
def bloque(session_temp, dia, actividad):
  return registrar_bloque(
    session_temp, BloqueCreate(fecha=dia.fecha, id_actividad=actividad.id)
  )