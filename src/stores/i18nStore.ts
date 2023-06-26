import { localStorageStore } from '@skeletonlabs/skeleton';
import { Language } from '$i18n/i18n';

const I_18_N_STORAGE_KEY = 'current_language'

export const languageLocalStorage = localStorageStore<Language>(I_18_N_STORAGE_KEY, Language.EN);

