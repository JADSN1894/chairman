import { Language, type Translation } from "$i18n/i18n";
import { derived } from "svelte/store";
import { languageLocalStorage } from "./i18nStore";

export const translationLocalStorage = derived(languageLocalStorage, ($languageLocalStorage) => {
    switch ($languageLocalStorage) {
        case Language.EN:

            return <Translation>{
                title: "en",
                welcome: "en",
                time: "en",
            }

        case Language.ES:

            return <Translation>{
                title: "es",
                welcome: "es",
                time: "es",
            }

        default:
            return <Translation>{
                title: 'UNKNOWN',
                welcome: 'UNKNOWN',
                time: 'UNKNOWN',
            }
    }
});
