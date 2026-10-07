export const HOME_PATH = "/";
export const HOST_DASHBOARD_PATH = "/create";
export const GUEST_PATH = "/play";

export type AppRoute = "home" | "host" | "guest";

export function resolveAppRoute(pathname: string): AppRoute {
  if (pathname === GUEST_PATH) {
    return "guest";
  }

  if (pathname === HOST_DASHBOARD_PATH) {
    return "host";
  }

  return "home";
}
