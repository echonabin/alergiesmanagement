import Input from '../Input/Input';
import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { Button } from '..';
import { Oval } from 'react-loader-spinner';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createAllergyAction, clearAlert } from '@alergiesmanagement/store';
import { createAlert } from '@alergiesmanagement/utils';

interface RootState {
  AllergyReducer: {
    loading: boolean;
    message: string;
    error: { message: string; status: number };
  };
}

type IAllergy = {
  name: string;
  symptoms: string;
  treatments: string;
  notes: string;
  severity: string;
};

const AddAllergyForm = () => {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch() as any;
  const { error, message, loading } = useSelector(
    (state: RootState) => state.AllergyReducer
  );
  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => dispatch(clearAlert), 3000);
      clearTimeout(timer);
    }
  }, [error.message, message, loading]);

  const onSubmitHandler = async (values: IAllergy) => {
    const id = toast.loading('Adding Allergy...');
    const formData = new FormData() as any;
    for (const key in values) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      formData.append(key, values[key]);
      formData.append('image', image!);
    }
    const res = await dispatch(createAllergyAction(formData));
    console.log(res);
    createAlert(id, res);
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          symptoms: '',
          treatments: '',
          notes: '',
          severity: '',
        }}
        onSubmit={async (values) => onSubmitHandler(values)}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form className="space-y-6">
            <div className="flex space-x-4 w-full">
              <Input
                label="Name"
                type="text"
                placeholder="Eye Allergies"
                name="name"
                value={values.name}
                onChange={handleChange}
                className="w-full"
              />
              <Input
                label="Symptoms"
                type="text"
                placeholder="Eye Ich, Red Eye"
                name="symptoms"
                value={values.symptoms}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <Input
              label="Severity"
              type="text"
              placeholder="Normal"
              name="severity"
              value={values.severity}
              onChange={handleChange}
              className=""
            />
            <Input
              label="Treatments"
              type="text"
              placeholder="Eye Drops"
              name="treatments"
              value={values.treatments}
              onChange={handleChange}
              className=""
            />
            <Input
              label="Notes"
              type="text"
              placeholder="Add Some notes here.."
              name="notes"
              value={values.notes}
              onChange={handleChange}
              className=""
            />
            <div className="flex flex-col">
              <label className="font-poppins font-thin text-base text-gray-500">
                Upload image
              </label>
              <input
                type="file"
                multiple={false}
                name="image"
                placeholder="Profile Image"
                onChange={onImageChange}
                className="border-[1px] border-gray-300 rounded-lg px-4 py-2 mt-2"
              />
            </div>
            <Button
              title={isSubmitting ? 'Adding Allergy' : 'Add Allergy'}
              varient="primary"
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              IconRight={isSubmitting ? Oval : null}
              className="w-full rounded-full py-3"
              type="submit"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddAllergyForm;
