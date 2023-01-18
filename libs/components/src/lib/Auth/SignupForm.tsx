/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react';
import { Formik, Form } from 'formik';
import { Oval } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../Input/Input';
import { Button, Alert } from '..';
import { createAlert, validateFormData } from '@alergiesmanagement/utils';
import { signUpUser } from '@alergiesmanagement/store';

interface RootState {
  AuthReducer: {
    message: string;
    error: { message: string; status: number };
    loading: boolean;
  };
}

interface IRegisterUser {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

const SignupForm = () => {
  const [image, setImage] = useState(null);
  const checkErr = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      return (
        <Alert
          type="error"
          content="Password and Confirm Password should be same"
        />
      );
    }
    return '';
  };

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const dispatch = useDispatch() as any;
  const { loading } = useSelector((state: RootState) => state.AuthReducer);
  async function onSubmitHandler<T>(values: IRegisterUser, resetForm: T) {
    const id = toast.loading('Adding User...');
    const formData = new FormData();
    for (const key in values) {
      // @ts-ignore
      if (key !== 'confirmPassword') formData.append(key, values[key]);
      if (image !== null) formData.append('image', image!);
    }
    const res = await dispatch(
      signUpUser(formData as unknown as IRegisterUser)
    );
    createAlert(id, res);
    if (res.status !== 400 || res.status !== 500) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      resetForm();
      setImage(null);
    }
  }
  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: '',
        }}
        validate={(values) => validateFormData<typeof values>(values)}
        onSubmit={async (values, { resetForm }) =>
          onSubmitHandler(values, resetForm)
        }
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form className="space-y-6">
            {errors.email && touched.email && (
              <Alert type="error" content={errors.email} />
            )}
            {errors.password !== errors.confirmPassword && (
              <Alert type="error" content="Passwords do not match" />
            )}
            {handleBlur('confirmPassword') &&
              checkErr(values.password, values.confirmPassword)}
            <Input
              label="What's your email?"
              id="Email"
              type="email"
              placeholder="example@example.com"
              name="email"
              value={values.email}
              onChange={handleChange}
              className=""
            />
            <div className="flex space-x-4 w-full">
              <Input
                label="First Name"
                id="FirstName"
                type="text"
                placeholder="John"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                className="w-full"
              />
              <Input
                label="Last Name"
                id="LastName"
                type="text"
                placeholder="Doe"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="flex space-x-4 w-full">
              <Input
                label="Your password"
                id="Password"
                type="password"
                placeholder=""
                name="password"
                value={values.password}
                onChange={handleChange}
                className="w-full"
              />
              <Input
                label="Confirm your password"
                id="ConfirmPassword"
                type="password"
                placeholder=""
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-poppins font-thin text-base text-gray-500">
                Upload profile image
              </label>
              <input
                type="file"
                id="ProfileImage"
                name="profileImage"
                placeholder="Profile Image"
                onChange={onImageChange}
                className="border-[1px] border-gray-300 rounded-lg px-4 py-2 mt-2"
              />
            </div>
            <Button
              title={loading ? 'Creating Account' : 'Create Account'}
              id="Signup_button"
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
  );
};

export default SignupForm;
