import { DialogProps } from '@mui/material/Dialog';
import { FormikValues } from 'formik/dist/types';
import { ReactNode } from 'react';

export interface DialogCommonProps extends DialogProps {
  open: boolean;
  dialogTitle: string | ReactNode;
  dialogDescription: string | ReactNode;
  onClose: () => void;
  onSubmit?: () => void;
}

export interface FormDialogProps extends DialogCommonProps {
  formikValues: FormikValues;
}
