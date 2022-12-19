import db from '../db/db';
import { DatabaseValidationErr } from '../errors/database-validation-error';
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
  const allergy = await allergyModel.select('*').where('name', name).first();
  if (allergy) {
    return new DatabaseValidationErr({
      reason: 'Allergy with this name already exists!',
    });
  }
  const response = await allergyModel
    .insert({
      name,
      severity,
      symptoms,
      allergy_image,
      created_by,
      treatments,
      notes,
    })
    .returning('*');
  return response;
};

export const getAllergies = async (page, limit) => {
  const allergyModel = db<IAllergy>('allergies');
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
  if (!allergies.length) {
    return new DatabaseValidationErr({
      reason: "There aren't any allergies, please create one.",
    });
  }
  const data = {
    count: parseInt(count),
    rows: allergies,
  };
  const response = addPaging<IAllergy>(data, page, limit);
  return response;
};

export const getSingleAllergy = async (id: string) => {
  const allergyModel = db<IAllergy>('allergies');
  const allergy = await allergyModel
    .select('*')
    .where('id', id)
    .andWhere('deleted_by', null);
  if (!allergy.length) {
    return new DatabaseValidationErr({ reason: 'Allergy not exists!' });
  }
  return allergy;
};

export const updateAllergy = async (id: string, data: IAllergy) => {
  const allergyModel = db<IAllergy>('allergies');
  const allergy = await allergyModel.select('id').where('id', id);
  if (!allergy.length) {
    return new DatabaseValidationErr({
      reason: "Allergy with this id dosen't exist!",
    });
  }
  const response = await allergyModel
    .where('id', id)
    .update(data)
    .returning('*');
  return response;
};

export const deleteAllery = async (id: string, userId: string) => {
  const allergyModel = db<IAllergy>('allergies');
  const response = await allergyModel
    .where('id', id)
    .andWhere('deleted_by', null)
    .update({
      deleted_by: parseInt(userId),
    })
    .returning('id');

  if (!response.length) {
    return new DatabaseValidationErr({ reason: 'Allergy not exists!' });
  }
  return `Allergy with id ${response[0].id} deleted!!`;
};

export const restoreAllergy = async (id: string, userId: string) => {
  const allergyModel = db<IAllergy>('allergies');
  const response = await allergyModel
    .where('id', id)
    .andWhere('deleted_by', userId)
    .update({
      deleted_by: null,
    })
    .returning('id');
  if (!response.length) {
    return new DatabaseValidationErr({ reason: 'Allergy not exists!' });
  }
  return `Allergy with id ${response[0].id} restored!!`;
};

export const hardDeleteAllergy = async (id: string) => {
  const allergyModel = db<IAllergy>('allergies');
  const response = await allergyModel.where('id', id).del().returning('id');
  if (!response.length) {
    return new DatabaseValidationErr({ reason: 'Allergy not exists!' });
  }
  return `Allergy with id ${response[0].id} permanently deleted!!`;
};
