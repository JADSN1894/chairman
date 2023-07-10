

export interface NoteTag {
    id: string,
    label: string,
}

export interface NoteItem {
    code: string,
    title: string,
    description: string
    createdAt: number,
    tags: NoteTag[]
}

export type AddNoteItem = Omit<NoteItem, "code" | "createdAt">;

export type Notes = NoteItem[]

export interface NoteItemCreate {
    description: string
}

export interface NoteItemEdit {
    code: string,
    description: string
}
