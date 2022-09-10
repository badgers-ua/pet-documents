import CakeIcon from '@mui/icons-material/Cake';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PaletteIcon from '@mui/icons-material/Palette';
import PeopleIcon from '@mui/icons-material/People';
import Box, { BoxProps } from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { IPetResDto } from '@pdoc/types';
import { isNumber } from 'lodash';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import PetAvatar from '../components/PetAvatar';
import { ReactComponent as AddUserIcon } from '../icons/add-user.svg';
import { ReactComponent as DeleteUserIcon } from '../icons/delete-user.svg';
import { ReactComponent as GenderIcon } from '../icons/gender.svg';
import { getAge, getUserDateFormat } from '../utils/date.utils';
import { getSpeciesLabel } from '../utils/factory.utils';
import { getGenderLabel } from '../utils/formatter.utils';

type PetInfoProps = {
  pet: IPetResDto;
  petActions: PetActionsProps;
} & BoxProps;

const PetInfoCardContainer = (props: PetInfoProps) => {
  const { pet, petActions, ...boxProps } = props;
  const {
    species,
    dateOfBirth,
    name,
    colour,
    notes,
    owners,
    weight,
    gender,
    breed,
    avatar
  } = pet;
  const { t } = useTranslation();

  return (
    <Box {...boxProps}>
      <Card>
        <CardContent sx={{ paddingBottom: 0 }}>
          <Box display="flex">
            <Box minWidth="90px" maxWidth="90px" height="90px">
              <PetAvatar size={90} url={avatar} species={species} />
            </Box>
            <Box ml={2} flex={1}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h5">{name}</Typography>

                <PetActions
                  display={{ xs: 'none', sm: 'block' }}
                  {...petActions}
                />
              </Box>

              {!!dateOfBirth && (
                <Typography variant="subtitle1">
                  {getAge(dateOfBirth)}
                </Typography>
              )}
              <Typography variant="subtitle1">
                {`${getSpeciesLabel(species)}${
                  !!breed ? ' - ' + breed?.name : ''
                }`}
              </Typography>
            </Box>
          </Box>
          <Box
            display={{ xs: 'flex', sm: 'none' }}
            justifyContent="center"
            alignItems="center"
            pt={1}
          >
            <PetActions {...petActions} />
          </Box>
        </CardContent>
        <CardContent sx={{ paddingTop: 0 }}>
          <List>
            <Grid container>
              <Grid item xs={12} sm={6} md={12} lg={6}>
                {Number.isInteger(gender) && (
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <GenderIcon width="40px" height="40px" />
                    </ListItemAvatar>

                    <ListItemText
                      primary={t('gender')}
                      secondary={getGenderLabel(gender!)}
                    />
                  </ListItem>
                )}

                {!!dateOfBirth && (
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <CakeIcon sx={{ width: '40px', height: '40px' }} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={t('birthday')}
                      secondary={DateTime.fromISO(dateOfBirth!).toFormat(
                        getUserDateFormat()
                      )}
                    />
                  </ListItem>
                )}

                {owners?.length && (
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <PeopleIcon sx={{ width: '40px', height: '40px' }} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={t('owners')}
                      secondary={owners.map(({ name }) => name).join(', ')}
                    />
                  </ListItem>
                )}
              </Grid>

              <Grid item xs={12} sm={6} md={12} lg={6}>
                {isNumber(weight) && (
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <FitnessCenterIcon
                        sx={{ width: '40px', height: '40px' }}
                      />
                    </ListItemAvatar>
                    <ListItemText primary={t('weight')} secondary={weight} />
                  </ListItem>
                )}

                {colour && (
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <PaletteIcon sx={{ width: '40px', height: '40px' }} />
                    </ListItemAvatar>
                    <ListItemText primary={t('color')} secondary={colour} />
                  </ListItem>
                )}

                {notes && (
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <DescriptionIcon sx={{ width: '40px', height: '40px' }} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={t('description')}
                      secondary={notes}
                    />
                  </ListItem>
                )}
              </Grid>
            </Grid>
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

type PetActionsProps = {
  updatePetLink: string;
  onAddOwnerClick: () => void;
  onRemoveOwnerClick: () => void;
  onDeletePetClick: () => void;
} & BoxProps;

const PetActions = (props: PetActionsProps) => {
  const {
    updatePetLink,
    onAddOwnerClick,
    onRemoveOwnerClick,
    onDeletePetClick,
    display = 'flex',
    ...otherBoxProps
  } = props;
  const { t } = useTranslation();

  return (
    <Box display={display} {...otherBoxProps}>
      <Link
        component={RouterLink}
        to={updatePetLink}
        color="inherit"
        underline="none"
      >
        <Tooltip title={t('editPet').toString()}>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Link>

      <Tooltip title={t('addOwner').toString()}>
        <IconButton onClick={onAddOwnerClick}>
          <AddUserIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title={t('removeOwner').toString()}>
        <IconButton onClick={onRemoveOwnerClick}>
          <DeleteUserIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title={t('deletePet').toString()}>
        <IconButton onClick={onDeletePetClick}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default PetInfoCardContainer;
