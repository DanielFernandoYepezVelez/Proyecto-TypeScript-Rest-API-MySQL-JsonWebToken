export interface IUserRegister {
  id?: string;
  name: string;
  email: string;
  password: string;
  created_at?: Date;
  update_at?: Date;
  url_id?: string;
}

export interface IUserSession {
  email: string;
  password: string;
}
