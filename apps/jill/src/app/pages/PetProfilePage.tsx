import { ApolloCache } from '@apollo/client/core';
import { useMutation } from '@apollo/client/react/hooks/useMutation';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import useTheme from '@mui/material/styles/useTheme';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { IEventResDto } from '@pdoc/types';
import { FormikConfig, useFormik } from 'formik';
import i18next from 'i18next';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useUser } from 'reactfire';
import * as Yup from 'yup';
import {
  AddOwnerReqDto,
  DeleteEventReqDto,
  DeleteEventResDto,
  DeletePetReqDto,
  PET_PROFILE_TAB,
  RemoveOwnerReqDto,
  RemoveOwnerResDto
} from '../../types';
import CenteredNoDataMessage from '../components/CenteredNoDataMessage';
import AlertDialog from '../components/form/AlertDialog';
import { EmailFormDialog } from '../components/form/EmailFormDialog';
import OwnersFormDialog from '../components/form/OwnersFormDialog';
import PetEventListContainer from '../containers/PetEventListContainer';
import PetInfoCardContainer from '../containers/PetInfoContainer';
import {
  ADD_OWNER_SCHEMA,
  DELETE_EVENT_SCHEMA,
  DELETE_PET_SCHEMA,
  PET_SCHEMA,
  REMOVE_OWNER_SCHEMA
} from '../hooks/api/schemas';
import useGetPetProfileGQL, {
  PetProfileGQLRes
} from '../hooks/api/useGetPetProfileGQL';
import useKeyPress from '../hooks/useKeyPress';
import { useActiveProfileTabStore } from '../providers/store/active-pet-profile-tab/ActivePetProfileTabProvider';
import { useLoaderStore } from '../providers/store/loader/LoaderStoreProvider';
import { getEventLabel, getHeaderHeight } from '../utils/factory.utils';

interface EmailFormDialogValues {
  email: string;
}

interface RadioFormDialog {
  ownerId: string;
}

const getInitialRadioValues = (): RadioFormDialog => {
  return { ownerId: '' };
};

const getInitialEmailValues = (): EmailFormDialogValues => {
  return {
    email: ''
  };
};

const a11yTabProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
};

const radioValidationSchema = Yup.object({
  ownerId: Yup.string().required(
    i18next.t('fieldRequiredValidator', { fieldName: i18next.t('owner') })
  )
});

const PetProfilePage = () => {
  const { id: petId } = useParams<{ id: string }>();
  const { data: user } = useUser();

  const { isLoading, data } = useGetPetProfileGQL(petId ?? '');

  const [addOwner, { loading: isAddOwnerLoading }] = useMutation(
    ADD_OWNER_SCHEMA,
    {
      refetchQueries: [{ query: PET_SCHEMA, variables: { id: petId } }]
    }
  );

  const petRemovedCacheUpdate = (cache: ApolloCache<any>) => {
    const petProfileCacheId = cache.identify({
      id: data?.getPet?._id,
      __typename: (data?.getPet as any)?.__typename
    });
    setTimeout(() => {
      cache.evict({ id: petProfileCacheId });
      cache.evict({ id: `PetResDto:${petId}` });
      cache.gc();
    });
  };

  const [removeOwner, { loading: isRemoveOwnerLoading }] = useMutation(
    REMOVE_OWNER_SCHEMA,
    {
      update: petRemovedCacheUpdate,
      onCompleted: ({ removeOwner }: { removeOwner: RemoveOwnerResDto }) => {
        if (removeOwner?._id === user?.uid) {
          navigate('/home');
        }
      }
    }
  );

  const [deletePet, { loading: isDeletePetLoading }] = useMutation(
    DELETE_PET_SCHEMA,
    {
      update: petRemovedCacheUpdate,
      onCompleted: () => {
        navigate('/home');
      }
    }
  );

  const [deleteEvent, { loading: isDeleteEventLoading }] = useMutation(
    DELETE_EVENT_SCHEMA,
    {
      update: (
        cache: ApolloCache<any>,
        {
          data
        }: { data?: { deleteEvent: DeleteEventResDto } | null | undefined }
      ) => {
        setTimeout(() => {
          cache.evict({ id: `EventResDto:${data?.deleteEvent?._id}` });
          cache.gc();
        });
      }
    }
  );

  const theme: any = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setIsLoading } = useLoaderStore();
  const { activeTab, setActiveTab } = useActiveProfileTabStore();
  const [addOwnerPetDialogOpen, setAddOwnerPetDialogOpen] =
    useState<boolean>(false);
  const [removeOwnerPetDialogOpen, setRemoveOwnerPetDialogOpen] =
    useState<boolean>(false);
  const [deletePetDialogOpen, setDeletePetDialogOpen] =
    useState<boolean>(false);
  const [deleteEventDialogState, setDeleteEventDialogState] = useState<{
    event: IEventResDto | null;
    isOpen: boolean;
  }>({ event: null, isOpen: false });

  const updatePetLink = `/update-pet/${petId}`;
  const createEventLink = `/create-event/${petId}`;

  const isSomeDialogOpened =
    addOwnerPetDialogOpen ||
    removeOwnerPetDialogOpen ||
    deletePetDialogOpen ||
    deleteEventDialogState.isOpen;

  useKeyPress({ key: 'e', route: updatePetLink, pause: isSomeDialogOpened });
  useKeyPress({ key: 'n', route: createEventLink, pause: isSomeDialogOpened });

  const emailValidationSchema = Yup.object({
    email: Yup.string()
      .email(t('invalidEmail'))
      .required(
        i18next.t('fieldRequiredValidator', { fieldName: i18next.t('email') })
      )
      .test('email', '', function (ownerEmail = '') {
        const ownerExists = !!data?.getPet?.owners?.some(
          ({ email = '' }) =>
            email.trim().toLowerCase() === ownerEmail?.trim().toLowerCase()
        );
        const { path, createError } = this;
        return ownerExists
          ? createError({
              path,
              message: t('petOwnerExists', {
                ownerName: ownerEmail,
                petName: data?.getPet?.name || ''
              })
            })
          : true;
      })
  });

  const formikEmailOptions: FormikConfig<EmailFormDialogValues> = {
    initialValues: getInitialEmailValues(),
    validationSchema: emailValidationSchema,
    enableReinitialize: true,
    onSubmit: async ({ email }) => {
      togglePetAddOwnerFormDialog();
      const addOwnerReqDto: AddOwnerReqDto = {
        ownerEmail: email,
        petId: petId ?? ''
      };
      addOwner({ variables: { addOwnerReqDto } });
    }
  };

  const formikRadioOptions: FormikConfig<RadioFormDialog> = {
    initialValues: getInitialRadioValues(),
    validationSchema: radioValidationSchema,
    enableReinitialize: true,
    onSubmit: async ({ ownerId }) => {
      togglePetRemoveOwnerFormDialog();
      const removeOwnerReqDto: RemoveOwnerReqDto = {
        ownerId,
        petId: petId ?? ''
      };
      removeOwner({ variables: { removeOwnerReqDto } });
    }
  };

  useEffect(() => {
    setIsLoading(
      isLoading ||
        isAddOwnerLoading ||
        isRemoveOwnerLoading ||
        isDeletePetLoading ||
        isDeleteEventLoading
    );
  }, [
    isLoading,
    setIsLoading,
    isAddOwnerLoading,
    isRemoveOwnerLoading,
    isDeletePetLoading,
    isDeleteEventLoading
  ]);

  const formikEmailValues = useFormik(formikEmailOptions);
  const formikRadioValues = useFormik(formikRadioOptions);

  if (!data?.getPet) {
    return <CenteredNoDataMessage />;
  }

  const { getEventsByPet: events, getPet: pet }: PetProfileGQLRes = data!;

  const togglePetAddOwnerFormDialog = () => {
    setAddOwnerPetDialogOpen(!addOwnerPetDialogOpen);
    formikEmailValues.resetForm();
  };

  const togglePetRemoveOwnerFormDialog = () => {
    setRemoveOwnerPetDialogOpen(!removeOwnerPetDialogOpen);
    formikRadioValues.resetForm();
  };

  const togglePetDeleteConfirmationDialog = () => {
    setDeletePetDialogOpen(!deletePetDialogOpen);
  };

  const toggleDeleteEventConfirmationDialog = (
    IEventResDto: IEventResDto | null
  ) => {
    setDeleteEventDialogState({
      event: IEventResDto,
      isOpen: !deleteEventDialogState.isOpen
    });
  };

  const handleTabChange = (
    event: SyntheticEvent,
    newValue: PET_PROFILE_TAB
  ) => {
    setActiveTab(newValue);
  };

  const handlePetDelete = () => {
    togglePetDeleteConfirmationDialog();
    const deletePetReqDto: DeletePetReqDto = {
      _id: petId ?? ''
    };
    deletePet({ variables: { deletePetReqDto } });
  };

  const handleEventDelete = () => {
    const deleteEventReqDto: DeleteEventReqDto = {
      _id: deleteEventDialogState.event!._id
    };
    toggleDeleteEventConfirmationDialog(null);
    deleteEvent({ variables: { deleteEventReqDto } });
  };

  const renderPetInfoCardContainer = () => {
    return (
      <PetInfoCardContainer
        sx={{
          position: 'sticky',
          top: `${getHeaderHeight(theme, isXs)}px`,
          paddingTop: isMdDown ? 0 : theme.spacing(2),
          backgroundColor: theme.palette.background.default
        }}
        pet={pet}
        petActions={{
          updatePetLink,
          onAddOwnerClick: togglePetAddOwnerFormDialog,
          onRemoveOwnerClick: togglePetRemoveOwnerFormDialog,
          onDeletePetClick: togglePetDeleteConfirmationDialog
        }}
      />
    );
  };

  const renderPetEventListContainer = () => {
    return (
      <PetEventListContainer
        events={events}
        petId={petId ?? ''}
        onEventDeleteClick={toggleDeleteEventConfirmationDialog}
      />
    );
  };

  const renderMobileView = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="tabs"
            centered
          >
            <Tab label={t('profile')} {...a11yTabProps(0)} />
            <Tab label={t('events')} {...a11yTabProps(1)} />
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          {activeTab === PET_PROFILE_TAB.PROFILE &&
            renderPetInfoCardContainer()}
          {activeTab === PET_PROFILE_TAB.EVENTS &&
            renderPetEventListContainer()}
        </Grid>
      </Grid>
    );
  };

  const renderDesktopView = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {renderPetInfoCardContainer()}
        </Grid>
        <Grid item xs={12} md={6} pb={2}>
          {renderPetEventListContainer()}
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <EmailFormDialog
        open={addOwnerPetDialogOpen}
        dialogTitle={t('addOwner')}
        formikValues={formikEmailValues}
        dialogDescription={
          <>{t('addOwnerDialogDescription', { petName: pet?.name })}</>
        }
        onClose={togglePetAddOwnerFormDialog}
      />
      <OwnersFormDialog
        open={removeOwnerPetDialogOpen}
        dialogTitle={t('removeOwner')}
        formikValues={formikRadioValues}
        owners={pet.owners}
        dialogDescription={
          <>{t('removeOwnerDialogDescription', { petName: pet.name })}</>
        }
        onClose={togglePetRemoveOwnerFormDialog}
      />
      <AlertDialog
        dialogTitle={t('deletePet')}
        dialogDescription={t('deletePetDialogDescription', {
          petName: pet?.name
        })}
        open={deletePetDialogOpen}
        onSubmit={handlePetDelete}
        onClose={togglePetDeleteConfirmationDialog}
      />
      <AlertDialog
        dialogTitle={t('deleteEvent')}
        dialogDescription={t('deleteEventDialogDescription', {
          eventName: deleteEventDialogState.event
            ? getEventLabel(deleteEventDialogState.event!.type)
            : null
        })}
        open={deleteEventDialogState.isOpen}
        onSubmit={handleEventDelete}
        onClose={() => toggleDeleteEventConfirmationDialog(null)}
      />
      {!isMdUp && renderMobileView()}
      {isMdUp && renderDesktopView()}

      {(activeTab === 1 || isMdUp) && (
        <Link
          sx={{
            position: 'fixed',
            bottom: (theme) => theme.spacing(2),
            right: (theme) => theme.spacing(2)
          }}
          component={RouterLink}
          to={createEventLink}
          color="inherit"
          underline="none"
        >
          <Tooltip title={t('createEvent').toString()}>
            <Fab color="secondary" aria-label="add">
              <AddIcon />
            </Fab>
          </Tooltip>
        </Link>
      )}
    </>
  );
};

export default PetProfilePage;
