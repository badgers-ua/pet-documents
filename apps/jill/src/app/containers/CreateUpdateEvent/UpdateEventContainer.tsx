import { EVENT, IEventResDto } from '@pdoc/types';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { DropDownOption, PatchEventReqDto } from '../../../types';
import CenteredNoDataMessage from '../../components/CenteredNoDataMessage';
import useGetEventByIdGQL from '../../hooks/api/useGetEventByIdGQL';
import useUpdateEventGQL from '../../hooks/api/useUpdateEventGQL';
import useSetLoadingStatus from '../../hooks/useSetLoadingStatus';
import { getEventLabel } from '../../utils/factory.utils';
import CreateUpdateEventForm, {
  CRUEventFormValues,
} from './_CreateUpdateEventForm';

export const UpdateEventContainer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { petId, id } = useParams<{ petId: string; id: string }>();

  const { event, isLoadingEvent } = useGetEventByIdGQL({
    eventId: id ?? '',
    petId: petId ?? '',
  });

  const { loadUpdateEvent, isUpdateEventLoading } = useUpdateEventGQL({
    petId: petId ?? '',
    onCompleted: () => navigate(-1),
  });

  const handleSubmit = ({ event, date, description }: CRUEventFormValues) => {
    const patchEventReqDto: PatchEventReqDto = {
      _id: id ?? '',
      petId: petId ?? '',
      type: +(event as any)?.value,
      date: (date as any as DateTime)
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .toISO(),
      description: !!description ? description : null,
    };

    loadUpdateEvent(patchEventReqDto);
  };

  useSetLoadingStatus({ isLoading: isUpdateEventLoading || isLoadingEvent });

  if (!event) {
    return <CenteredNoDataMessage />;
  }

  const {
    getEvent: { type, date, description },
  }: { getEvent: IEventResDto } = event!;

  const initialValues: CRUEventFormValues = {
    event: { label: getEventLabel(type), value: type } as DropDownOption<EVENT>,
    date: DateTime.fromISO(date),
    description: description ?? '',
  };

  return (
    <CreateUpdateEventForm
      submitButtonText={t('update')}
      onSubmit={handleSubmit}
      disabled={isUpdateEventLoading}
      initialValues={initialValues}
    />
  );
};
