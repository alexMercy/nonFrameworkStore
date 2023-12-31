import ru from './ru.json';

export const LANGUAGES: { [k: string]: string } = {
  ru: 'Russian',
  en: 'English',
};

export const t = (input: string) => {
  const lang = localStorage.getItem('lang')!;

  return lang === 'en' || !translateData[input]?.length ? input : translateData[input][0];
};

export const translateData: { [k: string]: string[] } = ru;
