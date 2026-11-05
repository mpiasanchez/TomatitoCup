export const HOME_PATH = "/";
export const HOST_DASHBOARD_PATH = "/create";
export const GUEST_PATH = "/play";
export const RESET_PASSWORD_PATH = "/auth/reset-password";

export type AppRoute = "home" | "host" | "guest" | "resetPassword";

export function resolveAppRoute(pathname: string): AppRoute {
  if (pathname === GUEST_PATH) {
    return "guest";
  }

  if (pathname === HOST_DASHBOARD_PATH) {
    return "host";
  }

  if (pathname === RESET_PASSWORD_PATH) {
    return "resetPassword";
  }

  return "home";
}
