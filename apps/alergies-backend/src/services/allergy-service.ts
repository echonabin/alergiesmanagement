import { createAllergy, getAllergies } from '../dao/allergy-dao';
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
    severity: severity,
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
