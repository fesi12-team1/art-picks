import { Session } from './session';
import { Member } from './user';

export interface Crew {
  id: number;
  name: string;
  description: string;
  city: string;
  image: string;
  members: Member[];
  sessions: Session[];
  createdAt: string;
}
