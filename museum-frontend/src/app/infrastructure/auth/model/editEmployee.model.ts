import { Role } from "./registration.model";

export interface EditEmployee {
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    role: EditRole
  }

  export enum EditRole {
    GUEST,
    ORGANIZER,
    CURATOR,
    RESTAURATEUR,
    ADMINISTRATOR,
  }