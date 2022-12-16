import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik';
import { Oval } from 'react-loader-spinner';
import { Button, Alert } from '..';
import Input from '../Input/Input';
import { clearAlert, loginUser } from '@alergiesmanagement/store';
import { cleanUp } from '@alergiesmanagement/utils';

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

  if (error) {
    toast(error.message, { type: 'error' });
    cleanUp(dispatch, clearAlert);
  }
  if (message) {
    toast(message, { type: 'success' });
    router.push('/');
  }
  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          const errors = {} as any;
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
          const { email, password } = values;
          dispatch(loginUser({ email, password }));
        }}
      >
        {({ values, errors, touched, handleChange, isSubmitting }) => (
          <Form className="space-y-6">
            {errors.email && touched.email && (
              <Alert type="error" content={errors.email} />
            )}
            {errors.password && touched.password && (
              <Alert type="error" content={errors.password} />
            )}
            <Input
              label="Your Email"
              type="email"
              placeholder=""
              name="email"
              value={values.email}
              onChange={handleChange}
              className=""
            />
            <Input
              label="Your password"
              type="password"
              placeholder=""
              name="password"
              value={values.password}
              onChange={handleChange}
              className=""
            />
            <Button
              title={isSubmitting ? 'Logging in' : 'Login'}
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
