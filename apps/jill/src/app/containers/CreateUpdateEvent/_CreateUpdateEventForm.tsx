import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { EVENT } from '@pdoc/types';
import { useFormik } from 'formik';
import { FormikHelpers } from 'formik/dist/types';
import i18next from 'i18next';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { DropDownOption } from '../../../types';
import LocalTextField from '../../components/LocalTextField';
import { getUserDateFormat } from '../../utils/date.utils';
import { getEventOptions } from '../../utils/factory.utils';

export interface CRUEventFormValues {
  event: DropDownOption<EVENT> | null;
  date: DateTime | null;
  description: string;
}

interface CreateUpdateEventFormProps {
  submitButtonText: string;
  disabled: boolean;
  initialValues: CRUEventFormValues;
  onSubmit: (
    values: CRUEventFormValues,
    formikHelpers: FormikHelpers<CRUEventFormValues>
  ) => void | Promise<any>;
}

const maxDescriptionFieldLength = 140;

const validationSchema = Yup.object({
  event: Yup.object()
    .nullable()
    .required(
      `${i18next.t('fieldRequiredValidator', {
        fieldName: i18next.t('event'),
      })}`
    ),
  description: Yup.string().max(
    maxDescriptionFieldLength,
    `${i18next.t('fieldMaxLengthValidator', {
      fieldName: i18next.t('description'),
      count: maxDescriptionFieldLength,
    })}`
  ),
  date: Yup.date()
    .nullable()
    .required(
      `${i18next.t('fieldRequiredValidator', {
        fieldName: i18next.t('date'),
      })}`
    )
    .typeError(
      i18next.t('fieldDateFormatValidator', {
        format: getUserDateFormat().toUpperCase(),
      })
    ),
});

const CreateUpdateEventForm = (props: CreateUpdateEventFormProps) => {
  const { submitButtonText, onSubmit, disabled, initialValues } = props;
  const { t } = useTranslation();

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    validateField,
    setFieldTouched,
    values,
    touched,
    errors,
  } = useFormik<CRUEventFormValues>({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  return (
    <Container maxWidth="sm">
      <Grid container pb={2}>
        <Grid item xs={12}>
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack mt={2} spacing={2}>
              <Autocomplete
                fullWidth
                noOptionsText={t('noOptions')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t('event')}
                    variant="outlined"
                    required
                    error={!!touched.event && !!errors.event}
                    helperText={(touched.event && errors.event) as string}
                  />
                )}
                isOptionEqualToValue={(option, value) => {
                  return option?.value === value?.value;
                }}
                value={values.event}
                options={getEventOptions()}
                getOptionLabel={({ label }) => label}
                onChange={(_, val) => {
                  setFieldValue('event', val, true);
                }}
                onBlur={() => {
                  setFieldTouched('event', true, true);
                }}
              />
              <DatePicker
                label={t('date')}
                inputFormat={getUserDateFormat()}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!touched.date && !!errors.date}
                    required
                    onBlur={() => {
                      setFieldTouched('date', true, true);
                    }}
                  />
                )}
                onError={() => {
                  validateField('date');
                }}
                value={values.date}
                onChange={async (val: DateTime | null) => {
                  await setFieldValue('date', val, true);
                  if (!(touched.date && errors.date)) {
                    return;
                  }
                  validateField('date');
                }}
              />
              <LocalTextField
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                label={t('description')}
                inputProps={{
                  maxLength: 140,
                }}
                name="description"
                error={!!touched.description && !!errors.description}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                helperText={touched.description && errors.description}
              />
              <Button type="submit" variant="contained" disabled={disabled}>
                {submitButtonText}
              </Button>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateUpdateEventForm;
