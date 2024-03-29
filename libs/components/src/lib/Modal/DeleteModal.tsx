import Swal from 'sweetalert2';

interface DeleteInterface {
  title?: string;
  text?: string;
  confirmHandler: () => void;
  refreshHandler?: (arg: boolean) => void;
}

const DeleteModal = ({ title, text, confirmHandler }: DeleteInterface) => {
  Swal.fire({
    title: title ? title : 'Are you sure?',
    text: text ? text : "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#142E71',
    cancelButtonColor: '#CE3131',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      confirmHandler();
      Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
    }
  });
};

export default DeleteModal;
