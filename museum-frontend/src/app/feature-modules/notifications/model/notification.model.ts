export interface NotificationResponse {
    id: number;
    message: string;
    type: NotificationType;  // Pretpostavlja se da imate NotificationType enum na frontend strani
    timestamp: string;  // LocalDateTime će biti serijalizovan kao string
    read: boolean;
    actionUrl: string;
  }

  export enum NotificationType {
    EXHIBITION = 'EXHIBITION',
    PURCHASE = 'PURCHASE',
    REVIEW = 'REVIEW',
    PROMOTION = 'PROMOTION',
    REMINDER = 'REMINDER'
  }
  