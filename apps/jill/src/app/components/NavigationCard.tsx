import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import Card, { CardProps } from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardHeader from '@mui/material/CardHeader';

interface _NavigationCardProps {
  avatar: JSX.Element;
  title: string | JSX.Element;
  subTitle: string | JSX.Element;
  arrowIcon?: boolean;
}

export type NavigationCardProps = CardProps & _NavigationCardProps;

const NavigationCard = (props: NavigationCardProps) => {
  const { avatar, title, subTitle, arrowIcon = true } = props;

  return (
    <Card data-test-id="navigation-card">
      <CardActionArea>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
        >
          <Box>
            <CardHeader
              sx={{ padding: 0 }}
              avatar={avatar}
              title={title}
              subheader={subTitle}
              titleTypographyProps={{ 'data-test-id': 'title' }}
              subheaderTypographyProps={{ 'data-test-id': 'subtitle' }}
            />
          </Box>
          {arrowIcon && (
            <ArrowForwardIosIcon
              sx={{ color: 'grey.500' }}
              data-test-id="navigation-icon"
            />
          )}
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default NavigationCard;
