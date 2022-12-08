import db from '../db/db';
import { IAllergy } from '../types/allergy-types';

export const createAllergy = async (data: IAllergy) => {
  const allergyModel = db<IAllergy>('allergies');
  const {
    name,
    severity,
    symptoms,
    allergy_image,
    created_by,
    treatments,
    notes,
  } = data;
  try {
    const allergy = await allergyModel.select('*').where('name', name).first();
    if (allergy) {
      return 'Allergy already exists';
    }
    await allergyModel.insert({
      name,
      severity,
      symptoms,
      allergy_image,
      created_by,
      treatments,
      notes,
    });
    return 'Allergy created successfully!!';
  } catch (error) {
    console.log(error);
    // FIXME: Add good error log here
    return 'Error occured while adding allergy!!';
  }
};
