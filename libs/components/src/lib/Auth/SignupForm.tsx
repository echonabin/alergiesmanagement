/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react';
import { Formik, Form } from 'formik';
import { Button, Alert } from '..';
import { Oval } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../Input/Input';
import { cleanUp } from '@alergiesmanagement/utils';
import { clearAlert, signUpUser } from '@alergiesmanagement/store';
import router from 'next/router';

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
      console.log(event.target.files[0]);
    }
  };

  const dispatch = useDispatch() as any;
  const { error, message, loading } = useSelector(
    (state: RootState) => state.AuthReducer
  );
  if (error) {
    cleanUp(dispatch, clearAlert);
    toast(error.message, { type: 'error' });
  }
  if (message) {
    toast(message, { type: 'success' });
    router.push('/login');
    cleanUp(dispatch, cleanUp);
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
        validate={(values) => {
          const errors = {} as { email: string };
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={async (values) => {
          const formData = new FormData();
          for (const key in values) {
            // @ts-ignore
            if (key !== 'confirmPassword') formData.append(key, values[key]);
            formData.append('image', image!);
          }
          dispatch(signUpUser(formData as unknown as IRegisterUser));
        }}
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
              label="What's you email?"
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
                type="text"
                placeholder="John"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                className="w-full"
              />
              <Input
                label="Last Name"
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
                type="password"
                placeholder=""
                name="password"
                value={values.password}
                onChange={handleChange}
                className="w-full"
              />
              <Input
                label="Confirm your password"
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
                name="profileImage"
                placeholder="Profile Image"
                onChange={onImageChange}
                className="border-[1px] border-gray-300 rounded-lg px-4 py-2 mt-2"
              />
            </div>
            <Button
              title={loading ? 'Creating Account' : 'Create Account'}
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
