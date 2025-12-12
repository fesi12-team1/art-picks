import { PaginationQueryParams } from './api';

export interface Crew {
  id: number;
  name: string;
  description: string;
  city: string;
  image: string;
  createdAt: string;
}

export type CrewListFilters = PaginationQueryParams & {
  region?: string;
  sort?: string;
};

export interface CrewMember {
  userId: number;
  name: string;
  profileImage: string | null;
  role: 'LEADER' | 'STAFF' | 'MEMBER';
  joinedAt: string;
}

export type CrewMemberRoleData = Pick<CrewMember, 'userId' | 'role'>;
