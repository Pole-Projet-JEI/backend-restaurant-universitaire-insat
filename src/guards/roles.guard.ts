import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    // Retrieve the roles metadata from the handler
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

    // If no roles are specified, allow access
    if (!requiredRoles) {
      return true;
    }

    // Get the request object from the context
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assuming user is attached to the request by JwtAuthGuard

    // If user is not authenticated, deny access
    if (!user) {
      throw new ForbiddenException("Access denied: No user found.");
    }

    // Validate if the user's role matches one of the required roles
    const userRole = user.role; // Assuming role is a string, not an array

    // Check if the user's role is one of the required roles
    const hasRole = requiredRoles.includes(userRole);

    // If no matching role, deny access
    if (!hasRole) {
      throw new ForbiddenException("Access denied: Insufficient role.");
    }

    // If the user has the required role, allow access
    return true;
  }
}
