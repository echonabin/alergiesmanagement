import db from '../db/db';
import { IAllergy } from '../types/allergy-types';
import { addPaging } from '../utils/add-pagination';

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

export const getAllergies = async (page, limit) => {
  const allergyModel = db<IAllergy>('allergies');
  try {
    const table_rows = await allergyModel.clone().count();
    const { count } = table_rows[0] as { count: string };

    const allergies = await allergyModel
      .select('*')
      .limit(limit)
      .offset(page * limit);

    const data = {
      count: parseInt(count),
      rows: allergies,
    };
    const response = addPaging<IAllergy>(data, page, limit);
    return response;
  } catch (error) {
    console.log(error);
    return 'Error, something went wrong!!';
  }
};
