import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

const CenteredNoDataMessage = () => {
  const { t } = useTranslation();
  return <ScreenCenteredMessage message={t('noDataToDisplay')} />;
};

interface ScreenCenteredMessageProps {
  message: string;
}

const ScreenCenteredMessage = (props: ScreenCenteredMessageProps) => {
  const { message } = props;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h6">{message}</Typography>
    </Box>
  );
};

export default CenteredNoDataMessage;
