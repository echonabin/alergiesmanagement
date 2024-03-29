import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik';
import { Oval } from 'react-loader-spinner';

import { Button, Alert } from '..';
import Input from '../Input/Input';
import { clearAlert, loginUser } from '@alergiesmanagement/store';
import { createAlert, validateFormData } from '@alergiesmanagement/utils';

interface RootState {
  AuthReducer: {
    message: string;
    error: { message: string; status: number };
    loading: boolean;
  };
}

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch() as any;
  const { error, message, loading } = useSelector(
    (state: RootState) => state.AuthReducer
  );

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => dispatch(clearAlert), 3000);
      clearTimeout(timer);
    }
  }, [error.message, message, loading]);

  const onSubmitHandler = async (values: {
    email: string;
    password: string;
  }) => {
    const id = toast.loading('Loading...');
    const { email, password } = values;
    const res = await dispatch(loginUser({ email, password }));
    createAlert(id, res);
    if (res.status === 200) {
      router.push('/dashboard');
    }
  };
  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => validateFormData<typeof values>(values)}
        onSubmit={async (values) => onSubmitHandler(values)}
      >
        {({ values, errors, touched, handleChange, isSubmitting }) => (
          <Form className="space-y-6">
            {errors.email && touched.email && (
              <Alert type="error" content={errors.email} id="Invalid_email" />
            )}
            {errors.password && touched.password && (
              <Alert type="error" content={errors.password} />
            )}
            <Input
              label="Your Email"
              id="Email"
              type="email"
              placeholder=""
              name="email"
              value={values.email}
              onChange={handleChange}
              className=""
            />
            <Input
              label="Your password"
              id="Password"
              type="password"
              placeholder=""
              name="password"
              value={values.password}
              onChange={handleChange}
              className=""
            />
            <Button
              title={isSubmitting ? 'Logging in' : 'Login'}
              id="Login_button"
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

export default LoginForm;
