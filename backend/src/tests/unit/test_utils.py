from datetime import time

import pytest

from src.utils.time import modificar_hora, validar_hora_granulidad


def test_modificar_hora_normal():
  assert modificar_hora(time(23, 0), 0.5) == time(23, 30)


def test_modificar_hora_medianoche():
  assert modificar_hora(time(23, 30), 0.5) == time(0, 0)


def test_modificar_hora_pasa_medianoche():
  with pytest.raises(ValueError):
    modificar_hora(time(23, 30), 1)


def test_validar_hora_granulidad_invalida():
  with pytest.raises(ValueError):
    validar_hora_granulidad(time(10, 15))
