export interface Tournament {
  id: number;
  name: string;
  game: string;
  gameSlug: string;
  prize: string;
  teams: number;
  startDate: string;
  endDate: string;
  status: 'ongoing' | 'upcoming' | 'completed';
  description: string;
  rules: string[];
  maxTeams: number;
  registrationDeadline: string;
  format: 'single_elimination' | 'double_elimination' | 'round_robin';
  entryFee?: string;
  location: 'online' | 'offline' | 'hybrid';
}

export interface TournamentMatch {
  id: number;
  team1: {
    id: number;
    name: string;
    logo?: string;
    score: number;
  };
  team2: {
    id: number;
    name: string;
    logo?: string;
    score: number;
  };
  winner?: number;
  stage: 'quarter_finals' | 'semi_finals' | 'final' | 'group_stage';
  matchDate: string;
  status: 'scheduled' | 'live' | 'completed';
}

export interface TournamentParticipant {
  id: number;
  teamName: string;
  teamLogo?: string;
  players: string[];
  registrationDate: string;
  status: 'registered' | 'confirmed' | 'eliminated';
  group?: string;
  points?: number;
  wins?: number;
  losses?: number;
}

export interface TournamentDetail extends Tournament {
  matches: TournamentMatch[];
  participants: TournamentParticipant[];
  brackets: {
    quarterFinals: TournamentMatch[];
    semiFinals: TournamentMatch[];
    final: TournamentMatch[];
  };
  prizeDistribution: {
    place: number;
    amount: string;
    team?: string;
  }[];
}

export interface TournamentsResponse {
  data: Tournament[];
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}

export interface TournamentDetailResponse {
  data: TournamentDetail;
}
