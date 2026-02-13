/**
 * Application Route Constants (TypeScript)
 */

export enum Routes {
  HOME = '/',
  ABOUT = '/about',
  LOGIN = '/login',
  REGISTER = '/register',
  DASHBOARD = '/dashboard',
  PROFILE = '/profile',
  SETTINGS = '/settings',
  NOT_FOUND = '*',
}

export const PUBLIC_ROUTES: string[] = [
  Routes.HOME,
  Routes.ABOUT,
  Routes.LOGIN,
  Routes.REGISTER,
];

export const PRIVATE_ROUTES: string[] = [
  Routes.DASHBOARD,
  Routes.PROFILE,
  Routes.SETTINGS,
];
