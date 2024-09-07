export interface Comment {
    id: number;
    userId: number | null;  // Može biti null za anonimne korisnike
    userPicture: string;
    userFirstName: string;
    userLastName: string;
    userCurator: boolean;
    userOrganizer: boolean;
    exhibitionId: number;
    exhibitionName: string;
    responses: Comment[];  // Lista odgovora na ovaj komentar
    text: string;
    commentDate: string;
    showReplies: boolean;
    showReplyForm: boolean;
}

export interface CreateComment {
    userId: number | null;  // Može biti null za anonimne korisnike
    exhibitionId: number;
    comment: string;
    parentCommentId: number | null;  // Može biti null ako komentar nije odgovor
}

