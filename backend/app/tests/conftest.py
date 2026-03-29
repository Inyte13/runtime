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
  poolclass=StaticPool,
  echo=False,
)


@pytest.fixture
def session_temp():
  SQLModel.metadata.create_all(engine_temp)
  with Session(engine_temp) as session:
    yield session
  SQLModel.metadata.drop_all(engine_temp)


@pytest.fixture
def client():
  SQLModel.metadata.create_all(engine_temp)

  def override_get_session():
    with Session(engine_temp) as session:
      yield session

  app.dependency_overrides[get_session] = override_get_session
  client = TestClient(app)
  yield client
  app.dependency_overrides.clear()
  SQLModel.metadata.drop_all(engine_temp)
