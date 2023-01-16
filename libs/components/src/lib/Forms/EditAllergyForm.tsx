import { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Oval } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { Button, Loading } from '..';
import Input from '../Input/Input';
import {
  getSingleAllergyAction,
  updateAllergyAction,
} from '@alergiesmanagement/store';
import { createAlert } from '@alergiesmanagement/utils';

type SingleAllergy = {
  id: number;
  name: string;
  symptoms: string;
  severity: string;
  treatments: string;
  notes: string;
  allergy_image: string;
  is_active: boolean;
  created_by: number;
  updated_by: any;
  deleted_by: any;
  created_at: string;
  updated_at: string;
};

interface IUpdateAllergy {
  symptoms?: string;
  treatments?: string;
  notes?: string;
  severity?: string;
}

interface RootState {
  AllergyReducer: {
    singleAllergy: SingleAllergy;
    loading: boolean;
    message: string;
    error: { message: string; status: number };
  };
}

const UpdateAllergyForm = () => {
  const dispatch = useDispatch() as any;
  const { loading, singleAllergy } = useSelector(
    (state: RootState) => state.AllergyReducer
  );

  const { id } = useRouter().query;
  useEffect(() => {
    if (id !== undefined) {
      const fetch = async () => {
        dispatch(getSingleAllergyAction(id as string));
      };
      fetch();
    }
  }, [id]);

  const { notes, severity, symptoms, treatments } = singleAllergy;

  const onSubmitHandler = async (values: IUpdateAllergy) => {
    const _id = toast.loading('Updating Allergy...');
    const formData = new FormData() as IUpdateAllergy;
    for (const key in values) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      formData.append(key, values[key]);
    }
    const res = await dispatch(updateAllergyAction(id as string, formData));
    createAlert(_id, res);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Formik
            initialValues={{
              notes,
              severity,
              symptoms,
              treatments,
            }}
            onSubmit={(values) => onSubmitHandler(values)}
          >
            {({ values, handleChange }) => (
              <Form className="space-y-6" id="Edit_allergy_form">
                <div className="flex space-x-4 w-full">
                  <Input
                    label="Severity"
                    id="Severity"
                    type="text"
                    placeholder="Normal"
                    name="severity"
                    value={values.severity}
                    onChange={handleChange}
                    className="w-full"
                  />
                  <Input
                    label="symptoms"
                    id="Symptoms"
                    type="text"
                    placeholder="Feaver,Cold"
                    name="symptoms"
                    value={values.symptoms}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
                <Input
                  label="Treatments"
                  type="text"
                  id="Treatments"
                  placeholder="Use antibiotic"
                  name="treatments"
                  value={values.treatments}
                  onChange={handleChange}
                  className=""
                />
                <div className="flex space-x-4 w-full">
                  <Input
                    label="Notes"
                    type="text"
                    id="Notes"
                    placeholder="Something as a note"
                    name="notes"
                    value={values.notes}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
                <Button
                  title={loading ? 'Updating Allergy' : 'Update Allergy'}
                  id="Update_button"
                  varient="primary"
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  IconRight={loading ? Oval : null}
                  className="w-full rounded-full py-3"
                  type="submit"
                />
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default UpdateAllergyForm;
