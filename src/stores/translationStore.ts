import { Language } from "$i18n/i18n";
import { derived } from "svelte/store";
import { languageLocalStorage } from "./i18nStore";

interface Translation {
    createdAt: string,
    noTasks: string,
    yes: string,
    no: string,
    cancel: string,
    create: string,
    update: string,
    action: string,
    task_created: string
    task_not_created: string,
    task_deleted: string,
    task_not_deleted: string,
    task_updated: string,
    task_not_updated: string
    are_you_sure: string,
    add_task: string,
    edit_task: string

}

export const translationLocalStorage = derived(languageLocalStorage, ($languageLocalStorage) => {
    switch ($languageLocalStorage) {
        case Language.EN:
            return {
                createdAt: "Created at",
                noTasks: "No tasks",
                yes: "Yes",
                no: "No",
                cancel: "Cancel",
                create: "Create",
                update: "Update",
                action: "Action",
                task_created: "Task created",
                task_not_created: "Task not created",
                task_deleted: "Task deleted",
                task_not_deleted: "Task not deleted",
                task_updated: "Task updated",
                task_not_updated: "Task not updated",
                are_you_sure: "Are you sure?",
                add_task: "Add task",
                edit_task: "Edit task"
            } satisfies Translation

        case Language.ES:
            return {
                createdAt: "Creado en",
                noTasks: "Sin tareas",
                yes: "Sí",
                no: "No",
                cancel: "Cancelar",
                create: "Crear",
                update: "Actualizar",
                action: "Acción",
                task_created: "Tarea creada",
                task_not_created: "Tarea no creada",
                task_deleted: "Tarea eliminada",
                task_not_deleted: "Tarea no eliminada",
                task_updated: "Tarea actualizada",
                task_not_updated: "Tarea no actualizada",
                are_you_sure: "¿Estas segura?",
                add_task: "Crear tarea",
                edit_task: "Editar tarea"
            } satisfies Translation

        case Language.PT:
            return {
                createdAt: "Criado em",
                noTasks: "Sem tarefas",
                yes: "Sim",
                no: "Não",
                cancel: "Cancelar",
                create: "Criar",
                update: "Atualizar",
                action: "Ação",
                task_created: "Tarefa criada",
                task_not_created: "Tarefa não criada",
                task_deleted: "Tarefa deletada",
                task_not_deleted: "Tarefa não deletada",
                task_updated: "Tarefa atualizada",
                task_not_updated: "Tarefa não atualizada",
                are_you_sure: "Têm certeza?",
                add_task: "Adicionar tarefa",
                edit_task: "Editar tarefa"
            } satisfies Translation
    }
});
