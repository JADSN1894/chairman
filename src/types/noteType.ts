

export type NoteTag = string


export interface NoteItem {
    code: string,
    title: string,
    description: string
    createdAt: number,
    tags: NoteTag[]
}

export type AddNoteItem = Omit<NoteItem, "code" | "createdAt">;
export type EditItem = Omit<NoteItem, "createdAt">;

export type Notes = NoteItem[]

// export interface NoteItemEdit {
//     code: string,
//     description: string
// }
