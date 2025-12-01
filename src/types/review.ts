export interface Review {
  id: string;
  userId: string;
  sessionId: string;
  description: string;
  rating: 1 | 2 | 3 | 4 | 5;
  createdAt: string;
  image?: string;
}
