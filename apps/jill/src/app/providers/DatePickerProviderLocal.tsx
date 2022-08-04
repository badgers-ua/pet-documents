import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useTranslation } from 'react-i18next';
import { Children } from '../../types';

const DatePickerProviderLocal = ({ children }: Children) => {
  const { i18n } = useTranslation();

  return (
    <LocalizationProvider
      dateAdapter={AdapterLuxon}
      adapterLocale={i18n.language}
    >
      {children}
    </LocalizationProvider>
  );
};

export default DatePickerProviderLocal;
