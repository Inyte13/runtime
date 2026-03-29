from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import create_db_and_tables
from app.routers.actividad import actividad_router
from app.routers.bloque import bloque_router
from app.routers.categoria import categoria_router
from app.routers.dia import dia_router


# Context manager de la app
@asynccontextmanager
async def lifespan(app: FastAPI):
  # Si no existen las tablas, las crea
  create_db_and_tables()
  yield  # Está corriendo
  # Al apagar puede ejecutar código como (cleanup, cerrar conexiones)


# Instancia principal de FastAPI con lifespan
app = FastAPI(lifespan=lifespan, title='Runtime App')
app.include_router(dia_router)
app.include_router(bloque_router)
app.include_router(categoria_router)
app.include_router(actividad_router)

# Orígenes permitidos para CORS
origins = [
  'http://localhost:5173',  # El frontend
  '*',  # Por ahora permitimos todo
]

# Middleware de CORS, controla que dominios pueden hablar con mi API
app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=['*'],
  allow_headers=['*'],
)
