export enum Language {
    EN = 'en-US',
    ES = 'es-ar',
    PT = 'pt-BR'
}

export function stringToLanguage(language: string): Language {
    switch (language) {
        case 'en-US':
            return Language.EN

        case 'es-ar':
            return Language.ES

        case 'pt-BR':
            return Language.PT

        default:
            return Language.EN
    }
}
