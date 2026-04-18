from datetime import date

from src.crud.dia import create_dia, read_dias_resumen
from src.models.dia import Dia


def test_read_dias_resumen(session_temp):
  create_dia(session_temp, Dia(fecha=date(2026, 1, 1)))
  dia_2 = create_dia(session_temp, Dia(fecha=date(2026, 1, 15)))
  dia_3 = create_dia(session_temp, Dia(fecha=date(2026, 2, 1)))

  dias = read_dias_resumen(session_temp, dia_2.fecha, dia_3.fecha)

  assert len(dias) == 2
  assert dias[0].fecha == dia_2.fecha
  assert dias[1].fecha == dia_3.fecha
