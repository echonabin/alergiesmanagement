import { IDefaultTimeStamp } from './global-types';

export interface IRefreshToken extends IDefaultTimeStamp {
  id: number;
  user_id: number;
  token: string;
  expires: string;
  is_active: boolean;
}
