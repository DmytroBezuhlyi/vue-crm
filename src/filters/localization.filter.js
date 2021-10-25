import store from '@/store';
import ru from '@/locales/ru.json';
import en from '@/locales/en.json';

const locales = {ru, en}

export default function localizationFilter(key) {
  const locale = store.getters.info.locale === 'en-US' ? 'en' : 'ru';
  return locales[locale][key] || `[Locale Error!]: there is no locale for key=${key}`;
}