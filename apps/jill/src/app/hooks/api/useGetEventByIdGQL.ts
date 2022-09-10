import { useQuery } from '@apollo/client/react/hooks/useQuery';
import { GetEventReqDto } from '../../../types';
import { EVENT_SCHEMA } from './schemas';

type UseGetEventByIdGQLProps = {
  petId: string;
  eventId: string;
};

const useGetEventByIdGQL = ({ petId, eventId }: UseGetEventByIdGQLProps) => {
  const {
    data: event,
    loading: isLoadingEvent,
    error: loadingEventError
  } = useQuery(EVENT_SCHEMA, {
    variables: { getEventReqDto: { _id: eventId, petId } as GetEventReqDto }
  });

  return {
    event,
    isLoadingEvent,
    loadingEventError
  };
};

export default useGetEventByIdGQL;
