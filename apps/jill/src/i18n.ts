import i18n, { Resource } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { environment } from './environments/environment';

const resources: Resource = {
  en: {
    translation: {
      en: 'English',
      uk: 'Ukrainian',
      all: 'All',
      main: 'Main',
      signOut: 'Sign out',
      createPet: 'Create pet',
      gender: 'Gender',
      birthday: 'Date of birth',
      owners: 'Owners',
      weight: 'Weight',
      color: 'Color',
      description: 'Description',
      event: 'Event',
      events: 'Events',
      date: 'Date',
      createEvent: 'Create event',
      search: 'Search',
      addOwner: 'Add owner',
      removeOwner: 'Remove owner',
      editPet: 'Edit pet',
      deletePet: 'Delete pet',
      age: 'Age',
      years: 'Years',
      month: 'Month',
      days: 'Days',
      name: 'Name',
      species: 'Species',
      breed: 'Breed',
      create: 'Create',
      fieldRequiredValidator: '{{fieldName}} is required.',
      fieldMaxLengthValidator:
        '{{fieldName}} must be {{count}} characters or less.',
      cat: 'Cat',
      dog: 'Dog',
      male: 'Male',
      female: 'Female',
      charsRemaining: 'Chars remaining',
      fieldMaxWeightValidator: "Weight can't be more than {{count}} kg.",
      fieldDateOfBirthFutureDateValidator: "Birthday can't be in future.",
      noOptions: 'No options',
      selectSpeciesFirst: 'Select species first.',
      fieldDateFormatValidator:
        'Invalid date format, enter date in {{format}} format.',
      eventVaccination: 'Vaccination',
      eventDeworming: 'Deworming',
      eventEndOfTreatment: 'End of treatment',
      eventOperation: 'Operation',
      eventChildbirth: 'Childbirth',
      eventSterilization: 'Sterilization',
      eventTickTreatment: 'Tick treatment',
      eventVaccinationAgainstRabies: 'Vaccination against rabies',
      eventVeterinarianExamination: 'Veterinarian examination',
      eventShow: 'Participation in the exhibition',
      eventReward: 'Reward',
      eventPhotoSession: 'Photo session',
      eventTraining: 'Training',
      eventStartOfTreatment: 'Start of treatment',
      eventPairing: 'Pairing',
      eventEstrus: 'Estrus',
      eventMolt: 'Molt',
      noEvents: 'No events.',
      update: 'Update',
      editEvent: 'Edit event',
      deleteEvent: 'Delete event',
      profile: 'Profile',
      email: 'Email',
      petOwnerExists: "{{ownerName}} is already {{petName}}'s owner.",
      addOwnerDialogDescription: `Please enter an email address of a user with whom you want to share
            ownership of {{petName}}. The user must be
            registered in-app.`,
      removeOwnerDialogDescription: `Please select the owner from which you want to remove the ownership
            of {{petName}}.`,
      deletePetDialogDescription: `Warning! You are about to delete {{petName}}, this cannot be reverted, also all owners will loose access to {{petName}}. Continue?`,
      deleteEventDialogDescription: `You are about to delete an event: "{{eventName}}", this can't be undone, Continue?`,
      add: 'Add',
      cancel: 'Cancel',
      invalidEmail: 'Invalid email.',
      appVersion: 'App version: {{version}}',
      owner: 'Owner',
      remove: 'Remove',
      delete: 'Delete',
      pets: 'Pets',
      upcomingEvents: 'Upcoming Events',
      todayEvents: "Today's events",
      addToCalendar: 'Add to calendar',
      noDataToDisplay: 'No data to display',
      futureFirst: 'Future first',
      pastFirst: 'Past first',
      default: 'Default',
      resetFilters: 'Reset filters',
      onlyUpcoming: 'Only future',
      sorting: 'Sorting',
      uploadPhoto: 'Upload photo',
      submit: 'Submit',
      other: 'Other',
    },
  },
  uk: {
    translation: {
      en: 'Англійська',
      uk: 'Українська',
      all: 'Усі',
      main: 'Головна',
      signOut: 'Вийти',
      createPet: 'Створити улюбленця',
      gender: 'Стать',
      birthday: 'Дата народження',
      owners: 'Власники',
      weight: 'Вага',
      color: 'Колір',
      description: 'Опис',
      event: 'Подія',
      events: 'Події',
      date: 'Дата',
      createEvent: 'Створити подію',
      search: 'Пошук',
      addOwner: 'Додати власника',
      removeOwner: 'Видалити власника',
      editPet: 'Редагувати улюбленця',
      deletePet: 'Видалити улюбленця',
      age: 'Вік',
      years: 'Років',
      month: 'Місяців',
      days: 'Днів',
      name: "Ім'я",
      species: 'Вид',
      breed: 'Порода',
      create: 'Створити',
      fieldRequiredValidator: "{{fieldName}} є обов'язковим полем.",
      fieldMaxLengthValidator:
        '{{fieldName}} має містити {{count}} символів, або менше.',
      cat: 'Кіт',
      dog: 'Пес',
      male: 'Чоловіча',
      female: 'Жіноча',
      charsRemaining: 'Символів залишилось',
      fieldMaxWeightValidator: 'Вага не може бути більше {{count}} кг.',
      fieldDateOfBirthFutureDateValidator:
        'День народження не може бути в майбутньому.',
      noOptions: 'Немає даних',
      selectSpeciesFirst: 'Оберіть спочатку вид.',
      fieldDateFormatValidator:
        'Неправильний формат дати, введіть дату у форматі: {{format}}.',
      eventVaccination: 'Вакцинація',
      eventDeworming: 'Дегельмінтизація',
      eventEndOfTreatment: 'Кінець лікування',
      eventOperation: 'Операція',
      eventChildbirth: 'Роди',
      eventSterilization: 'Стерелізація/Кастрація',
      eventTickTreatment: 'Щеплення проти кліщів',
      eventVaccinationAgainstRabies: 'Щеплення проти сказу',
      eventVeterinarianExamination: 'Огляд лікаря',
      eventShow: 'Участь у виставці',
      eventReward: 'Нагорода',
      eventPhotoSession: 'Фотосесія',
      eventTraining: 'Дресерування',
      eventStartOfTreatment: 'Початок лікування',
      eventPairing: 'Спарювання',
      eventEstrus: 'Еструс',
      eventMolt: 'Линька',
      noEvents: 'Немає подій.',
      update: 'Оновити',
      editEvent: 'Редагувати подію',
      deleteEvent: 'Видалити подію',
      profile: 'Профіль',
      email: 'Електронна пошта',
      petOwnerExists: '{{ownerName}} вже є власником {{petName}}.',
      addOwnerDialogDescription: `Будь ласка, введіть адресу електронної пошти користувача, з яким ви хочете поділи
            право власності на {{petName}}. Користувач повинен бути
            зареєстрований у додатку.`,
      removeOwnerDialogDescription: `Виберіть власника, в якого ви хочете вилучити право власності на {{petName}}.`,
      deletePetDialogDescription: `Увага! Ви збираєтеся видалити {{petName}}, це неможливо скасувати, також усі власники втратять доступ до {{petName}}. Продовжити?`,
      deleteEventDialogDescription: `Ви збираєтесь видалити подію: "{{eventName}}", це неможливо скасувати, Продовжити?`,
      add: 'Додати',
      cancel: 'Відмінити',
      invalidEmail: 'Некоректний формат електронної адресси.',
      appVersion: 'Версія додатку: {{version}}',
      owner: 'Власник',
      remove: 'Видалити',
      delete: 'Видалити',
      pets: 'Улюбленці',
      upcomingEvents: 'Майбутні події',
      todayEvents: 'Сьогоднішні події',
      addToCalendar: 'Додати в календар',
      noDataToDisplay: 'Немає даних для відображення',
      futureFirst: 'Спочатку майбутні',
      pastFirst: 'Спочатку минулі',
      default: 'За замовчуванням',
      resetFilters: 'Скинути фільтри',
      onlyUpcoming: 'Лише майбутні',
      sorting: 'Сортування',
      uploadPhoto: 'Завантажити фото',
      submit: 'Застосувати',
      other: 'Інше',
    },
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    debug: !environment.production,
    interpolation: {
      escapeValue: false,
    },
    react: { useSuspense: true },
  });

document.documentElement.lang = i18n.language;

i18n.on('languageChanged', (lng: string) => {
  document.documentElement.setAttribute('lang', lng);
});

export default i18n;
