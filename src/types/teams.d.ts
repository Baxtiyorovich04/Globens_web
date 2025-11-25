export interface Team {
  id: number;
  slug: string;
  name: string;
  avatar_url: string;
  game_id: string;
  game_name: string | null;
  description: string;
  members_count: number;
  members: TeamMember[];
  created_at: string;
  updated_at: string;
}

export interface CreateTeamData {
  name: string;
  game_id: string;
  avatar?: File;
  description?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  email: string | null;
  is_captain: boolean;
  is_invited: boolean;
  is_accepted: boolean;
}
