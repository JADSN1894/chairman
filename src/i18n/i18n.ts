export interface Translation {
    createdAt: string,
    noTasks: string
}

export enum Language {
    EN = 'en',
    ES = 'es',
    PT = 'pt'
}

export function stringToLanguage(language: string): Language {
    switch (language.trim().toLowerCase()) {
        case 'en':
            return Language.EN

        case 'es':
            return Language.ES

        case 'pt':
            return Language.PT

        default:
            return Language.EN
    }
}
