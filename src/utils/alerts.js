import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showAlert = (type, title, text) => {
  const toastId = toast[type](`${title}: ${text}`, {
    position: "top-right",
    autoClose: 1000,       // Toast closes after 5 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    // draggable: true,
    progress: undefined,
    onClose: () => {
      console.log('Toast closed', toastId);
    }
  });

  const closeToastManually = () => {
    toast.dismiss(toastId);
  };

  return closeToastManually;
};

export default showAlert;
