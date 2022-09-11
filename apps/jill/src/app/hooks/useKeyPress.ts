import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type UseKeyPressProps = {
  key: string;
  route: string;
  pause?: boolean;
};

const useKeyPress = ({ key, route, pause = false }: UseKeyPressProps) => {
  const navigate = useNavigate();

  const keyPressHandler = ({ key: keyPressed }: KeyboardEvent) => {
    if (pause) {
      return;
    }
    if (keyPressed !== key) {
      return;
    }
    navigate(route);
  };

  const removeListener = () => {
    window.removeEventListener('keypress', keyPressHandler);
  };

  useEffect(
    function listenForKeypress() {
      removeListener();
      window.addEventListener('keypress', keyPressHandler);
      return removeListener;
    },
    [pause]
  );
};

export default useKeyPress;
