export interface NoteItem {
    code: string,
    description: string
    createdAt: number
}

export interface NoteItemCreate {
    description: string
}


export enum CreateStatus {
    CREATED,
    NOTCREATED
}

export enum DeleteStatus {
    DELETED,
    NOTDELETED
}

export interface NoteItemEdit {
    code: string,
    description: string
}

export enum EditStatus {
    EDITED,
    NOTEDITED
}