import { CanActivate, ExecutionContext, Inject, Logger } from "@nestjs/common";
import { AuthService } from "src/features/auth/auth.service";

export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AuthService) private readonly _authService: AuthService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const { token } = context.switchToHttp().getRequest();

      if (!token) return false;

      await this._authService.validateToken(token);

      return await this._authService.validateUser(token);
    } catch (err) {
      Logger.error(err);
      return false;
    }
  }
}
