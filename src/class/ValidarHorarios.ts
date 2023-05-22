import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class VerificarHorarios {
  validarHorarios(horarios: any[]) {
    for (let i = 0; i < horarios.length; i++) {
      const horarioAtual = horarios[i];

      for (let j = i + 1; j < horarios.length; j++) {
        const horarioComparado = horarios[j];

        if (
          horarioAtual.diaSemana === horarioComparado.diaSemana &&
          this.horariosConflitantes(horarioAtual, horarioComparado)
        ) {
          throw new BadRequestException(
            `Há um conflito de horários no dia ${horarioAtual.diaSemana}`,
          );
        }
      }
    }
  }

  horariosConflitantes(horario1: any, horario2: any): boolean {
    const inicio1 = this.converterParaData(horario1.inicio);
    const fim1 = this.converterParaData(horario1.fim);
    const inicio2 = this.converterParaData(horario2.inicio);
    const fim2 = this.converterParaData(horario2.fim);

    return (
      (inicio1 >= inicio2 && inicio1 <= fim2) ||
      (fim1 >= inicio2 && fim1 <= fim2) ||
      (inicio2 >= inicio1 && inicio2 <= fim1) ||
      (fim2 >= inicio1 && fim2 <= fim1)
    );
  }

  converterParaData(horario: string): Date {
    const [hora, minutos] = horario.split(':');
    const data = new Date();
    data.setHours(parseInt(hora, 10), parseInt(minutos, 10), 0, 0);
    return data;
  }
}
