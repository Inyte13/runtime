from datetime import time

import pytest

from app.schemas.bloque import BloqueCreate, BloqueUpdate
from app.services.bloque import (
  actualizar_bloque,
  eliminar_bloque,
  registrar_bloque,
  registrar_bloque_al_inicio,
  registrar_bloque_btn,
  registrar_bloque_despues,
)
from app.utils.time import modificar_hora


