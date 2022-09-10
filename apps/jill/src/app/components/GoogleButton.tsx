import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ReactComponent as GoogleIcon } from '../icons/google.svg';

type GoogleButtonProps = {
  onClick: () => void;
};

const GoogleButton = ({ onClick }: GoogleButtonProps) => {
  const { t } = useTranslation();

  return (
    <Button
      sx={{
        background: '#fff',
        textTransform: 'none'
      }}
      onClick={onClick}
      variant="contained"
      startIcon={<GoogleIcon width={24} />}
    >
      {t('signInWithGoogle')}
    </Button>
  );
};

export default GoogleButton;
