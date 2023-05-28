import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FuncLocalAuthGuard extends AuthGuard('func') {}
