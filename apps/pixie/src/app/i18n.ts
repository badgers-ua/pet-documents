import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

const i18n = new I18n({
  en: {
    petDocuments: 'Pet Documents',
    welcome: 'Welcome',
  },
  uk: {
    petDocuments: 'Pet Documents',
    welcome: 'Ласкаво просимо',
  },
});

i18n.locale = Localization.locale;
i18n.enableFallback = true;

export default i18n;
