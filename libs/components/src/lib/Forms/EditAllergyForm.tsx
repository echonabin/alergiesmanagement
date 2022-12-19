import { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Button, Loading } from '..';
import Input from '../Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { Oval } from 'react-loader-spinner';
import {
  getSingleAllergyAction,
  updateAllergyAction,
  clearAlert,
} from '@alergiesmanagement/store';
import { cleanUp, createAlert } from '@alergiesmanagement/utils';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

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

  const { allergy_image, notes, severity, symptoms, treatments } =
    singleAllergy;

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
              <Form className="space-y-6">
                <div className="flex space-x-4 w-full">
                  <Input
                    label="Severity"
                    type="text"
                    placeholder="Normal"
                    name="severity"
                    value={values.severity}
                    onChange={handleChange}
                    className="w-full"
                  />
                  <Input
                    label="symptoms"
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
                    placeholder="Something as a note"
                    name="notes"
                    value={values.notes}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
                <Button
                  title={loading ? 'Updating Allergy' : 'Update Allergy'}
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