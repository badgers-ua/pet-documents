import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { CreateEventReqDto } from '../../../types';
import useCreateEventGQL from '../../hooks/api/useCreateEventGQL';
import useSetLoadingStatus from '../../hooks/useSetLoadingStatus';
import { getDateWithMidnightUTCTime } from '../../utils/date.utils';
import CreateUpdateEventForm, {
  CRUEventFormValues,
} from './_CreateUpdateEventForm';

const initialFormValues: CRUEventFormValues = {
  event: null,
  date: DateTime.now(),
  description: '',
};

export const CreateEvent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { petId } = useParams<{ petId: string; id: string }>();

  const { loadCreateEvent, isCreateEventLoading } = useCreateEventGQL({
    petId: petId ?? '',
    onCompleted: () => {
      navigate(`/pet/${petId}`);
    },
  });

  const handleSubmit = ({ event, date, description }: CRUEventFormValues) => {
    const createEventReqDto: CreateEventReqDto = {
      petId: petId ?? '',
      type: +(event as any)?.value,
      date: getDateWithMidnightUTCTime((date as any as DateTime)?.toISO()),
      description: description ? description : null,
    };

    loadCreateEvent(createEventReqDto);
  };

  useSetLoadingStatus({ isLoading: isCreateEventLoading });

  return (
    <CreateUpdateEventForm
      submitButtonText={t('create')}
      onSubmit={handleSubmit}
      disabled={isCreateEventLoading}
      initialValues={initialFormValues}
    />
  );
};
