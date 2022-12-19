import { toast, Id } from 'react-toastify';

export const createAlert = (id: Id, res: any) => {
  if (res.status === 400) {
    toast.update(id, {
      render: res.message,
      autoClose: 4000,
      type: 'error',
      isLoading: false,
    });
  } else if (res.status === 201 || res.status === 200) {
    toast.update(id, {
      render: res.message,
      autoClose: 4000,
      type: 'success',
      isLoading: false,
    });
  } else {
    toast.update(id, {
      render: 'Something went wrong!!',
      autoClose: 4000,
      type: 'error',
      isLoading: false,
    });
  }
};
