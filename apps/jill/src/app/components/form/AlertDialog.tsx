import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';
import { DialogCommonProps } from './types';

export const AlertDialog = ({
  open = false,
  dialogTitle,
  dialogDescription,
  onSubmit = () => {},
  onClose = () => {},
  ...other
}: DialogCommonProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} {...other}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogDescription}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          {t('cancel')}
        </Button>
        <Button onClick={onSubmit} color="inherit" autoFocus>
          {t('delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
