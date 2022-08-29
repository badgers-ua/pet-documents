import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type UseKeyPressProps = {
  key: string;
  route: string;
};

const useKeyPress = ({ key, route }: UseKeyPressProps) => {
  const navigate = useNavigate();

  useEffect(function listenForKeypress() {
    const keyPressHandler = ({ key: keyPressed }: KeyboardEvent) => {
      if (keyPressed !== key) {
        return;
      }
      navigate(route);
    };

    window.addEventListener('keypress', keyPressHandler);
    return () => {
      window.removeEventListener('keypress', keyPressHandler);
    };
  }, []);
};

export default useKeyPress;
