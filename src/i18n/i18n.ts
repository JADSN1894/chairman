import { languageLocalStorage } from "$stores/i18nStore";
import { derived } from "svelte/store";

export interface Translation {
    title: string,
    welcome: string,
    time: string,
}

export enum Language {
    EN = 'en',
    ES = 'es'
}

export function stringToLanguage(language: string): Language {
    switch (language.trim().toLowerCase()) {
        case 'en':
            return Language.EN

        case 'es':
            return Language.ES

        default:
            return Language.EN
    }
}



