import { Language, type Translation } from "$i18n/i18n";
import { derived } from "svelte/store";
import { languageLocalStorage } from "./i18nStore";

export const translationLocalStorage = derived(languageLocalStorage, ($languageLocalStorage) => {
    switch ($languageLocalStorage) {
        case Language.EN:
            return <Translation>{
                createdAt: "Created at",
                noTasks: "No tasks"
            }

        case Language.ES:
            return <Translation>{
                createdAt: "Creado en",
                noTasks: "Sin tareas"
            }

        case Language.PT:
            return <Translation>{
                createdAt: "Criado em",
                noTasks: "Sem tarefas"
            }

        default:
            return <Translation>{
                createdAt: "Unknown",
                noTasks: "Unknown"
            }
    }
});
