export interface Comment {
    id: number;
    userId: number | null;  // Može biti null za anonimne korisnike
    userPicture: string;
    userFirstName: string;
    userLastName: string;
    isUserCurator: boolean;
    isUserOrganizer: boolean;
    exhibitionId: number;
    exhibitionName: string;
    responses: Comment[];  // Lista odgovora na ovaj komentar
    text: string;
    commentDate: string;
}

export interface CreateComment {
    userId: number | null;  // Može biti null za anonimne korisnike
    exhibitionId: number;
    comment: string;
    parentCommentId: number | null;  // Može biti null ako komentar nije odgovor
}

