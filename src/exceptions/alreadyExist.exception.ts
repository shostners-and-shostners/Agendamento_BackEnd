import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyExist extends HttpException {
  constructor(msg: string | string[]) {
    super(msg, HttpStatus.CONFLICT);
  }
}
