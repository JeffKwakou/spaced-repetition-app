export interface Flashcard {
    _id: string;
    userId: string;
    folderId: string;
    front: string;
    back: string;
    date_revision: Date;
    easiness_factor: number;
    correct_repetition: number;
    interval: number;
    info_sup: string;
}