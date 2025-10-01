import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * @param roles 
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
