import { useNavigate } from 'react-router-dom';

const useBackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return goBack;
};

export default useBackButton;
