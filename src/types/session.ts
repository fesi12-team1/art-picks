export interface Session {
  id: string;
  crewId: string;
  userId: string;
  status: 'OPEN' | 'CLOSED';

  name: string;
  description: string;
  image?: string;
  city: string;
  district: string;
  createdAt: string;
  sessionAt: string;
  registerBy: string;
  level: 'beginner' | 'intermediate' | 'advanced';

  maxParticipantCount: number;

  // participants: Member[];
  // likedUsers: User[];
  // reviews: Review[];
}
