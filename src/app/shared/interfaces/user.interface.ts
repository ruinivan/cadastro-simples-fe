export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  birthDay: string;
  telephone: number;
}

export interface NewUser {
  name: string;
  email: string;
  password: string;
  birthDay?: string;
  telephone?: number;
}

export interface EditUser {
  id: string;
  name: string;
  email: string;
  password: string;
  birthDay: string;
  telephone: number;
}
