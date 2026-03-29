from datetime import time


def modificar_hora(hora: time, duracion: float) -> time:
  # Calculamos pero en minutos, por las 24:00
  minutos_inicio = hora.hour * 60 + hora.minute
  minutos_fin = minutos_inicio + int(duracion * 60)
  if minutos_fin == 1440:
    return time(0, 0)
  if minutos_fin > 1440:
    raise ValueError('El bloque se pasa de medianoche')
  return time(minutos_fin // 60, minutos_fin % 60)
