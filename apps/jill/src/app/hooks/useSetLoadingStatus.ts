import { useEffect } from 'react';
import { isLoading } from '../../types';
import { useLoaderStore } from '../providers/store/loader/LoaderStoreProvider';

const useSetLoadingStatus = ({ isLoading }: isLoading) => {
  const { setIsLoading } = useLoaderStore();

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);
};

export default useSetLoadingStatus;
