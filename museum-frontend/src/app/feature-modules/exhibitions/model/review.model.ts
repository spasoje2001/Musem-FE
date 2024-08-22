export interface Review {
    id: number;
    guestId: number;
    guestPicture: string;
    guestFirstName: string;
    guestLastName: string;
    exhibitionId: number;
    exhibitionName: string;
    rating: number;
    comment: string;
    reviewDate: string;
}

export interface CreateReview {
    guestId: number;
    exhibitionId: number;
    rating: number;
    comment: string;
}