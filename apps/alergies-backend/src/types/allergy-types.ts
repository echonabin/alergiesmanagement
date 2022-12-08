import { IDefaultTimeStamp } from './global-types';

export interface IAllergy extends IDefaultTimeStamp {
  name: string;
  symptoms: string;
  severity: string;
  allergy_image: string;
  treatments?: string;
  notes?: string;
  is_active: boolean;
  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
}

export type AllergyProps = {
  allergyImage: string;
  name: string;
  symptoms: string;
  treatments: string;
  notes: string;
  createdBy: number;
  severity: string;
};
