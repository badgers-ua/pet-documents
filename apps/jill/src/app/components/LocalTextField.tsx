import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LocalTextField = (props: TextFieldProps) => {
  const [value, setValue] = useState<any>(props?.value);
  const { t } = useTranslation();

  return (
    <>
      <TextField
        {...props}
        onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
          const val: string = e.target.value;
          setValue(val);
          if (!props.onChange) {
            return;
          }
          props.onChange(e);
        }}
      />
      {!!props?.inputProps?.['maxLength'] && (
        <Box mt={1}>
          <LinearProgress
            variant="determinate"
            value={
              (((value ?? '')?.length ?? 0) /
                props?.inputProps?.['maxLength']) *
              100
            }
          />
          <Box mt={0.5} display="flex" justifyContent="flex-end">
            <Typography variant="caption" color="textSecondary">
              {`${
                props?.inputProps?.['maxLength'] - ((value ?? '')?.length ?? 0)
              } ${t('charsRemaining').toLowerCase()}`}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default LocalTextField;
