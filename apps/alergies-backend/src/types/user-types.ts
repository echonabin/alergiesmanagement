export interface IUser {
  user_id?: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  profile_url: string;
  created_at?: string;
  updated_at?: string;
}
