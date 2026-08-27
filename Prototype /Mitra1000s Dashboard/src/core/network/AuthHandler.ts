// ==============================================================================
// Template: AuthHandler.ts
// Description: Token & session management handler.
//              Mengelola penyimpanan, pembacaan, dan penghapusan auth token.
// ==============================================================================

const AUTH_TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'auth_refresh_token';
const USER_KEY = 'auth_user';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

export class AuthHandler {
  // ---- Token Management ----

  static getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  static setToken(token: string): void {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  static setRefreshToken(token: string): void {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }

  static clearTokens(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  // ---- Session Check ----

  static isAuthenticated(): boolean {
    return !!AuthHandler.getToken();
  }

  // ---- User Profile ----

  static getUser(): AuthUser | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }

  static setUser(user: AuthUser): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  static hasRole(role: string): boolean {
    const user = AuthHandler.getUser();
    return user?.roles.includes(role) ?? false;
  }

  // ---- Full Logout ----

  static logout(): void {
    AuthHandler.clearTokens();
    // Tambahkan redirect atau callback di sini sesuai kebutuhan fitur auth.
    // Contoh: window.location.href = '/login';
  }
}
