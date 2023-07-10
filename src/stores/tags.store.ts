import { browser } from "$app/environment";
import { localStorageStore } from "@skeletonlabs/skeleton";

const tags_STORAGE_KEY = 'tags'

export const tagsLocalStorage = localStorageStore<string[]>(tags_STORAGE_KEY, []);

tagsLocalStorage.subscribe((value) => {
    if (browser) {
        localStorage.setItem(tags_STORAGE_KEY, JSON.stringify(value));
    }
});


export const addTag = (tagName: string) => {
    tagsLocalStorage.update((currentTags): string[] => {
        return [...currentTags, tagName]
    })
}
