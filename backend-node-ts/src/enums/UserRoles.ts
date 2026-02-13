/**
 * User Roles Enum
 * Defines all possible user roles in the system
 */

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user',
  GUEST = 'guest',
}

/**
 * Role hierarchy - higher number = more permissions
 */
export const RoleHierarchy: Record<UserRole, number> = {
  [UserRole.SUPER_ADMIN]: 100,
  [UserRole.ADMIN]: 80,
  [UserRole.MANAGER]: 60,
  [UserRole.USER]: 40,
  [UserRole.GUEST]: 20,
};

/**
 * Check if a role has higher or equal permissions
 */
export function hasRolePermission(userRole: UserRole, requiredRole: UserRole): boolean {
  return RoleHierarchy[userRole] >= RoleHierarchy[requiredRole];
}

/**
 * Get all roles lower than the given role
 */
export function getLowerRoles(role: UserRole): UserRole[] {
  const roleLevel = RoleHierarchy[role];
  return Object.entries(RoleHierarchy)
    .filter(([_, level]) => level < roleLevel)
    .map(([roleName, _]) => roleName as UserRole);
}
