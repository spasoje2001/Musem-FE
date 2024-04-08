export interface Registration {
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  password: string,
  role: Role
}

export enum Role {
  Guest = 0,
  Organizer = 1,
  Curator = 2,
  Restaurateur = 3,
  Administrator = 4,
}