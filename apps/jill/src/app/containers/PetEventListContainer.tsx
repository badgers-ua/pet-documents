import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EventIcon from '@mui/icons-material/Event';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import useTheme from '@mui/material/styles/useTheme';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery/useMediaQuery';
import { EVENT, IEventResDto } from '@pdoc/types';
import i18next from 'i18next';
import { orderBy } from 'lodash';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { DropDownOption } from '../../types';
import CenteredNoDataMessage from '../components/CenteredNoDataMessage';
import { addEventToCalendar } from '../utils/calendar.utils';
import {
  getUserDateFormat,
  isPast,
  isTodayOrFuture,
} from '../utils/date.utils';
import {
  getEnumIntegerValues,
  getEventLabel,
  getEventOptions,
  getHeaderHeight,
} from '../utils/factory.utils';

type PetEventsGridProps = {
  petId: string;
  events: IEventResDto[];
  onEventDeleteClick: (event: IEventResDto) => void;
};

type Filters = {
  selectedEvent: EventFilter;
  selectedSorting: SORTING;
  isFutureOnly: boolean;
};

type ToolbarProps = {
  filters: Filters;
  onFiltersChanged: (filters: Filters) => void;
};

type EventFilter = EVENT | 'all';

enum SORTING {
  DEFAULT,
  ASC,
  DESC,
}

const eventTypes = (): DropDownOption<EVENT | 'all'>[] => [
  { label: i18next.t('all'), value: 'all' },
  ...getEventOptions(),
];

const getSortingLabel = (sorting: SORTING): string => {
  const dictionary = {
    [SORTING.DEFAULT]: i18next.t('default'),
    [SORTING.ASC]: i18next.t('pastFirst'),
    [SORTING.DESC]: i18next.t('futureFirst'),
  };
  return dictionary[sorting];
};

const sortingOptions = (): DropDownOption<SORTING>[] =>
  getEnumIntegerValues<SORTING>(SORTING).map(
    (value: SORTING) =>
      ({
        label: getSortingLabel(value),
        value,
      } as DropDownOption<SORTING>)
  );

const defaultFilters: Filters = {
  isFutureOnly: false,
  selectedEvent: 'all',
  selectedSorting: SORTING.DEFAULT,
};

const PetEventListContainer = (props: PetEventsGridProps) => {
  const { events = [], petId, onEventDeleteClick } = props;
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const { t } = useTranslation();

  const filteredEvents: IEventResDto[] =
    filters.isFutureOnly || filters.selectedEvent !== 'all'
      ? events.filter(({ date, type }: IEventResDto) => {
          const dateMatch = filters.isFutureOnly ? isTodayOrFuture(date) : true;
          const eventMatch =
            filters.selectedEvent === 'all'
              ? true
              : +filters.selectedEvent === type;
          return dateMatch && eventMatch;
        })
      : events;

  const sortedAndFilteredEvents: IEventResDto[] =
    filters.selectedSorting === SORTING.DEFAULT
      ? filteredEvents
      : orderBy(
          filteredEvents,
          ({ date }) => DateTime.fromISO(date).toJSDate(),
          filters.selectedSorting === SORTING.ASC ? 'asc' : 'desc'
        );

  if (!events.length) {
    return (
      <Box position="relative" height="100%">
        <CenteredNoDataMessage />
      </Box>
    );
  }

  return (
    <Box>
      <Toolbar
        filters={filters}
        onFiltersChanged={(filters: Filters) => {
          setFilters(filters);
        }}
      />
      <Stack spacing={2}>
        {sortedAndFilteredEvents.map((event: IEventResDto) => {
          const { type, date, _id, description, petName } = event;
          const isPastEvent: boolean = isPast(date);

          const addToCalendar = () => {
            addEventToCalendar({
              petName,
              eventName: getEventLabel(type),
              eventDescription: description,
              eventDate: date,
            });
          };

          return (
            <Card key={_id} variant={isPastEvent ? 'outlined' : 'elevation'}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {getEventLabel(type)}
                </Typography>
                <Typography variant="subtitle1">
                  {DateTime.fromISO(date).toFormat(getUserDateFormat())}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </CardContent>
              <CardActions>
                <Link
                  component={RouterLink}
                  to={`/update-event/${petId}/${_id}`}
                  color="inherit"
                  underline="none"
                >
                  <Tooltip title={t('editEvent').toString()}>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </Link>
                <Tooltip title={t('deleteEvent').toString()}>
                  <IconButton onClick={() => onEventDeleteClick(event)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('addToCalendar').toString()}>
                  <IconButton onClick={addToCalendar}>
                    <EventIcon />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
};

const Toolbar = ({ filters, onFiltersChanged }: ToolbarProps) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  const { t } = useTranslation();

  const handleTypeChanged = (event: SelectChangeEvent) => {
    const val: EventFilter = event.target.value as EventFilter;
    onFiltersChanged({
      ...filters,
      selectedEvent: val,
    });
  };

  const handleSortingChanged = (event: SelectChangeEvent) => {
    const sorting: SORTING = +event.target.value as SORTING;
    onFiltersChanged({
      ...filters,
      selectedSorting: +sorting,
    });
  };

  const handleFutureOnlyToggled = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isFutureOnly: boolean = event.target.checked;
    onFiltersChanged({
      ...filters,
      isFutureOnly,
    });
  };

  const handleResetFilters = () => {
    onFiltersChanged(defaultFilters);
  };

  return (
    <Stack
      mb={2}
      position="sticky"
      top={`${getHeaderHeight(theme, isXs)}px`}
      paddingTop={theme.spacing(2)}
      sx={{ backgroundColor: theme.palette.background.default }}
      zIndex={1}
    >
      <Box mb={2} display="flex" alignItems="flex-end">
        <Stack spacing={2} direction="row" flex={1}>
          <FormControl size="small" sx={{ flex: 1 }}>
            <InputLabel id="event-type-label">{t('event')}</InputLabel>
            <Select
              label={t('event').toString()}
              labelId="event-type-label"
              id="event-type-select"
              value={filters.selectedEvent.toString()}
              onChange={handleTypeChanged}
            >
              {eventTypes().map(({ label, value }) => {
                return (
                  <MenuItem value={value} key={label}>
                    {value === 'all' ? <em>{label}</em> : label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ flex: 1 }}>
            <InputLabel id="sort-label">{t('sorting')}</InputLabel>
            <Select
              label={t('sorting').toString()}
              labelId="sort-label"
              id="sort-select"
              value={filters.selectedSorting.toString()}
              onChange={handleSortingChanged}
            >
              {sortingOptions().map(({ label, value }) => {
                return (
                  <MenuItem key={label} value={value}>
                    {label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Stack>
      </Box>

      <Stack direction="row">
        <FormControl component="fieldset" size="small" sx={{ flex: 1 }}>
          <FormGroup aria-label="position" row>
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={filters.isFutureOnly}
                  onChange={handleFutureOnlyToggled}
                />
              }
              label={t('onlyUpcoming').toString()}
              labelPlacement="end"
            />
          </FormGroup>
        </FormControl>

        <Tooltip title={t('resetFilters').toString()}>
          <IconButton onClick={handleResetFilters}>
            <ClearIcon></ClearIcon>
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default PetEventListContainer;
