import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import { FormDialogProps } from './types';

export const EmailFormDialog = ({
  open = false,
  dialogTitle,
  dialogDescription,
  onClose = () => {},
  formikValues: {
    handleSubmit,
    handleChange,
    handleBlur,
    handleReset,
    errors,
    touched,
    values,
  },
  ...other
}: FormDialogProps) => {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onClose={onClose} {...other}>
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        autoComplete="off"
        noValidate
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogDescription}</DialogContentText>
          <Box pt={1}>
            <TextField
              margin="dense"
              label={t('email')}
              type="email"
              fullWidth
              autoFocus
              required
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              value={values.email}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={onClose} color="inherit">
            {t('cancel')}
          </Button>
          <Button type="submit" color="inherit">
            {t('add')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EmailFormDialog;
