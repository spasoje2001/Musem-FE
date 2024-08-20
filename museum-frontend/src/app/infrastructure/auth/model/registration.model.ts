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
  Administrator = 3,
}