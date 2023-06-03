import { browser } from '$app/environment';
import type { NoteItem } from '$types/noteType';
import { localStorageStore } from '@skeletonlabs/skeleton';

const LOCAL_STORAGE_KEY = 'notes'
// const initialNoteSotre: NoteItem[] = browser ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || `[]`) ?? [] : [];

export const noteLocalStorage = localStorageStore<NoteItem[]>(LOCAL_STORAGE_KEY, []);

noteLocalStorage.subscribe((value) => {
    if (browser) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
    }
});


export const addTodo = (description: string) => {
    noteLocalStorage.update((currentNotes): NoteItem[] => {
        return [...currentNotes, <NoteItem>{ code: crypto.randomUUID(), description, createdAt: Date.now() }];
    });
};

export const deleteNote = (code: string) => {
    noteLocalStorage.update((currentNotes) => {
        return currentNotes.filter((note) => note.code !== code);
    });
};

export const editTodo = (code: string, description: string) => {
    noteLocalStorage.update((currentNotes) => {
        return currentNotes.map((note) => {
            if (note.code === code) {
                return { ...note, description };
            }
            return note;
        });
    });
};