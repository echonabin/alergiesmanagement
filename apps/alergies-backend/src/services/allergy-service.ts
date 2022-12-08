import { createAllergy } from '../dao/allergy-dao';
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
