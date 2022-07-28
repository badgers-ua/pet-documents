import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { SPECIES } from '@pdoc/types';
import { getPetAvatarLogoBySpecies } from '../utils/formatter.utils';

type PetAvatarProps = {
  url?: string;
  isLoading?: boolean;
  size: number;
  species: SPECIES;
};

const PetAvatar = ({ url, isLoading, species, size = 48 }: PetAvatarProps) => {
  if (isLoading) {
    return (
      <Box
        width={size}
        height={size}
        minWidth={size}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size={size} />
      </Box>
    );
  }

  return url ? (
    <Avatar src={url} sx={{ width: size + 'px', height: size + 'px' }} />
  ) : (
    getPetAvatarLogoBySpecies(species, size)
  );
};

export default PetAvatar;
