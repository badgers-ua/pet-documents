import { useMutation } from '@apollo/client/react/hooks/useMutation';
import { useMemo } from 'react';
import { CreateEventReqDto } from '../../../types';
import {
  CREATE_EVENT_SCHEMA,
  EVENTS_SCHEMA,
  UPCOMING_EVENTS_SCHEMA
} from './schemas';

type UseCreateEventGQLProps = {
  petId: string;
  onCompleted: () => void;
};

const useCreateEventGQL = ({ petId, onCompleted }: UseCreateEventGQLProps) => {
  const [createEvent, { loading: isCreateEventLoading }] = useMutation(
    CREATE_EVENT_SCHEMA,
    {
      refetchQueries: [
        { query: EVENTS_SCHEMA, variables: { petId } },
        { query: UPCOMING_EVENTS_SCHEMA }
      ],
      onCompleted
    }
  );

  const loadCreateEvent = useMemo(
    () => (createEventReqDto: CreateEventReqDto) =>
      createEvent({ variables: { createEventReqDto } }),
    [createEvent]
  );

  return { loadCreateEvent, isCreateEventLoading };
};

export default useCreateEventGQL;
