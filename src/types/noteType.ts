export interface NoteItem {
    code: string,
    description: string
    createdAt: number
}

export type Notes = NoteItem[]

export interface NoteItemCreate {
    description: string
}

export interface NoteItemEdit {
    code: string,
    description: string
}
