import {
  createAllergy,
  getAllergies,
  getSingleAllergy,
  updateAllergy,
} from '../dao/allergy-dao';
import { AllergyProps, IAllergy } from '../types/allergy-types';

export const createAllergyService = async (data: AllergyProps) => {
  const {
    allergyImage,
    name,
    symptoms,
    treatments,
    notes,
    createdBy,
    severity,
  } = data;
  const finalData = {
    allergy_image: allergyImage,
    name,
    symptoms,
    treatments,
    notes,
    created_by: createdBy,
    severity,
  } as IAllergy;

  const response = await createAllergy(finalData);

  return response;
};

export const getAllergiesService = async (data: {
  page: number;
  limit: number;
}) => {
  const { limit, page } = data;
  const response = await getAllergies(page, limit);
  return response;
};

export const getSingleAllergyService = async (id: string) => {
  const response = await getSingleAllergy(id);
  return response;
};

export const updateAllergyService = async (id: string, data: AllergyProps) => {
  const finalData = {} as IAllergy;
  for (const key in data) {
    if (key === 'allergyImage') {
      Object.assign(finalData, { allergy_image: data[key] });
    } else if (key === 'createdBy') {
      Object.assign(finalData, { created_by: data[key] });
    } else Object.assign(finalData, { [key]: data[key] });
  }
  const response = await updateAllergy(id, finalData);
  return response;
};
