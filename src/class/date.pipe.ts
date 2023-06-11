import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class DatePipe implements PipeTransform<string, Date> {
  transform(value: string): Date {
    const date = new Date(value);

    if (isNaN(date.getTime())) {
      throw new BadRequestException('Data inválida');
    }

    return date;
  }
}
