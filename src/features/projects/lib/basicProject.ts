import { selectUsers } from '@/db/types';



export interface ProjectDetails {
  id: string;
  name: string;
  description?: string;
  tagline?: string;
  stage: string;
  size: string;
  pitch: string;
  industries: string[];
  nonProfitStatus: boolean;
  createdAt: string;
  updatedAt: string;
  startDate?: string;
  location?: string;
  members: selectUsers[];
}
