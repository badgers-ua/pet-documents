import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useTranslation } from 'react-i18next';
import { Owner } from '../../../types';
import { FormDialogProps } from './types';

export interface RadioFormDialogProps extends FormDialogProps {
  owners: Owner[];
}

export const OwnersFormDialog = ({
  open = false,
  dialogTitle,
  dialogDescription,
  onClose = () => {},
  owners = [],
  formikValues: {
    handleSubmit,
    setFieldValue,
    handleReset,
    errors,
    touched,
    values,
  },
  ...other
}: RadioFormDialogProps) => {
  const { t } = useTranslation();

  const renderRadios = () => {
    const radioElements = owners.map((owner: Owner) => {
      return (
        <FormControlLabel
          key={owner._id}
          value={owner._id}
          control={<Radio />}
          label={owner.name}
        />
      );
    });
    return (
      <FormControl component="fieldset">
        <RadioGroup
          value={values.ownerId}
          onChange={({ target: { value: newOwnerId } }) => {
            setFieldValue('ownerId', newOwnerId);
          }}
        >
          {radioElements}
        </RadioGroup>
        <FormHelperText error={!!(touched.ownerId && errors.ownerId)}>
          {touched.ownerId && errors.ownerId}
        </FormHelperText>
      </FormControl>
    );
  };

  return (
    <Dialog open={open} onClose={onClose} {...other}>
      <form onSubmit={handleSubmit} onReset={handleReset} autoComplete="off">
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogDescription}</DialogContentText>
          {renderRadios()}
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={onClose} color="inherit">
            {t('cancel')}
          </Button>
          <Button type="submit" color="inherit">
            {t('remove')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default OwnersFormDialog;
