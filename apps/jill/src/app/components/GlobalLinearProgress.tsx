import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import { useLoaderStore } from '../providers/store/loader/LoaderStoreProvider';

const GlobalLinearProgress = () => {
  const { isLoading } = useLoaderStore();

  if (!isLoading) {
    return <></>;
  }

  return (
    <LinearProgress
      sx={{ position: 'fixed', left: 0, right: 0, zIndex: 2 }}
      className="global-linear-progress"
    />
  );
};

export default GlobalLinearProgress;
