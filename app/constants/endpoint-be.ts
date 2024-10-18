export const BE_API_URL: string = process.env.BE_API_URL ?? "http://localhost:8080";
export const BE_BASE: string = BE_API_URL + "/api";
export const BE_AUTH: string = BE_BASE + "/auths";
export const BE_USER_ROLE: string = BE_BASE + "/user-roles";
export const BE_USER_ROLE_MENU: string = BE_USER_ROLE + "/menus";
export const BE_PERIOD: string = BE_BASE + "/periods";
