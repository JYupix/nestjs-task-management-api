export interface JwtPayload {
  sub: string; // userId
  email: string;
  role: string; // UserRole
  iat?: number;
  exp?: number;
}
