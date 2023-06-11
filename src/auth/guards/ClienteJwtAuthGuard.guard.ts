import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class ClienteJwtAuthGuard extends AuthGuard('jwtCliente') {
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    console.log(user);
    if (err || !user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
