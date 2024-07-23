// src/interfaces/ExtendedJwtPayload.ts
import { JwtPayload } from "jwt-decode";

export interface ExtendedJwtPayload extends JwtPayload {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  isAdmin: boolean;
  isBusiness: boolean;
  _id: string;
}
