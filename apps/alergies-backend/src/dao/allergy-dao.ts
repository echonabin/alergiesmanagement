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
    const table_rows = await allergyModel
      .clone()
      .where('deleted_by', null)
      .count();
    const { count } = table_rows[0] as { count: string };

    const allergies = await allergyModel
      .select('*')
      .where('deleted_by', null)
      .limit(limit)
      .offset(page * limit);
    if (allergies.length === 0) {
      return "There aren't any allergies, please create one.";
    }
    const data = {
      count: parseInt(count),
      rows: allergies,
    };
    const response = addPaging<IAllergy>(data, page, limit);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleAllergy = async (id: string) => {
  const allergyModel = db<IAllergy>('allergies');
  try {
    const allergy = await allergyModel
      .select('*')
      .where('id', id)
      .andWhere('deleted_by', null);
    if (allergy.length === 0) {
      return `No allergy found with this id ${id}!`;
    }
    return allergy;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateAllergy = async (id: string, data: IAllergy) => {
  const allergyModel = db<IAllergy>('allergies');
  try {
    await allergyModel.where('id', id).update(data);
    return `Allergy Updated successfully!!`;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllery = async (id: string, userId: string) => {
  const allergyModel = db<IAllergy>('allergies');
  try {
    const response = await allergyModel
      .where('id', id)
      .update({
        deleted_by: parseInt(userId),
      })
      .returning('id');
    return `Allergy with id ${response[0].id} deleted!!`;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const hardDeleteAllergy = async (id: string) => {
  const allergyModel = db<IAllergy>('allergies');
  try {
    const response = await allergyModel.where('id', id).del().returning('id');
    return `Allergy with id ${response[0].id} permanently deleted!!`;
  } catch (error) {
    console.log(error);
    return error;
  }
};
