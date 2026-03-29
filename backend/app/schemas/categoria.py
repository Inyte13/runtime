import re

from pydantic import field_validator
from sqlmodel import SQLModel

from app.schemas.actividad import ActividadReadDetail, ActividadResumen


