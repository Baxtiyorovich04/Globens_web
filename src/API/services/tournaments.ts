import { TournamentDetail, TournamentsResponse, TournamentDetailResponse } from '@/types/tournament';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface TournamentRegistrationData {
  teamName: string;
  players: string[];
  captainEmail: string;
}

interface TournamentRegistrationResponse {
  success: boolean;
  message: string;
  teamId?: number;
}

export const tournamentService = {
  // Barcha turnirlarni olish
  async getTournaments(): Promise<TournamentsResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/tournaments`);
      if (!response.ok) {
        throw new Error('Failed to fetch tournaments');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching tournaments:', error);
      throw error;
    }
  },

  // Bitta turnir ma'lumotini olish
  async getTournamentById(id: number): Promise<TournamentDetailResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/tournaments/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tournament');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching tournament:', error);
      throw error;
    }
  },

  // Turnirga ro'yxatdan o'tish
  async registerForTournament(tournamentId: number, teamData: TournamentRegistrationData): Promise<TournamentRegistrationResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/tournaments/${tournamentId}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teamData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to register for tournament');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error registering for tournament:', error);
      throw error;
    }
  },

  // Mock data for development
  getMockTournamentDetail(id: number): TournamentDetail {
    return {
      id,
      name: "Globens CS:GO Championship",
      game: "Counter-Strike 2",
      gameSlug: "cs2",
      prize: "$50,000",
      teams: 32,
      startDate: "2023-11-15",
      endDate: "2023-12-15",
      status: "ongoing",
      description: "Eng yaxshi CS:GO jamoalari uchun yillik chempionat. $50,000 pul mukofoti va professional o'yin muhitida raqobat qilish imkoniyati.",
      rules: [
        "Har bir jamoa 5 ta o'yinchidan iborat bo'lishi kerak",
        "O'yinlar Best of 3 formatida o'tkaziladi",
        "Cheat va hile ishlatish taqiqlanadi",
        "Har bir o'yin 30 daqiqadan iborat",
        "Final o'yini Best of 5 formatida"
      ],
      maxTeams: 32,
      registrationDeadline: "2023-11-10",
      format: "single_elimination",
      location: "online",
      matches: [
        {
          id: 1,
          team1: { id: 1, name: "Team Alpha", score: 16 },
          team2: { id: 2, name: "Team Beta", score: 14 },
          winner: 1,
          stage: "quarter_finals",
          matchDate: "2023-11-20",
          status: "completed"
        },
        {
          id: 2,
          team1: { id: 3, name: "Team Gamma", score: 19 },
          team2: { id: 4, name: "Team Delta", score: 17 },
          winner: 3,
          stage: "quarter_finals",
          matchDate: "2023-11-21",
          status: "completed"
        },
        {
          id: 3,
          team1: { id: 1, name: "Team Alpha", score: 0 },
          team2: { id: 3, name: "Team Gamma", score: 0 },
          stage: "semi_finals",
          matchDate: "2023-11-25",
          status: "scheduled"
        }
      ],
      participants: [
        {
          id: 1,
          teamName: "Team Alpha",
          players: ["Player1", "Player2", "Player3", "Player4", "Player5"],
          registrationDate: "2023-10-15",
          status: "confirmed",
          group: "A",
          points: 9,
          wins: 3,
          losses: 0
        },
        {
          id: 2,
          teamName: "Team Beta",
          players: ["Player6", "Player7", "Player8", "Player9", "Player10"],
          registrationDate: "2023-10-16",
          status: "eliminated",
          group: "A",
          points: 6,
          wins: 2,
          losses: 1
        },
        {
          id: 3,
          teamName: "Team Gamma",
          players: ["Player11", "Player12", "Player13", "Player14", "Player15"],
          registrationDate: "2023-10-17",
          status: "confirmed",
          group: "B",
          points: 9,
          wins: 3,
          losses: 0
        }
      ],
      brackets: {
        quarterFinals: [
          {
            id: 1,
            team1: { id: 1, name: "Team Alpha", score: 16 },
            team2: { id: 2, name: "Team Beta", score: 14 },
            winner: 1,
            stage: "quarter_finals",
            matchDate: "2023-11-20",
            status: "completed"
          },
          {
            id: 2,
            team1: { id: 3, name: "Team Gamma", score: 19 },
            team2: { id: 4, name: "Team Delta", score: 17 },
            winner: 3,
            stage: "quarter_finals",
            matchDate: "2023-11-21",
            status: "completed"
          }
        ],
        semiFinals: [
          {
            id: 3,
            team1: { id: 1, name: "Team Alpha", score: 0 },
            team2: { id: 3, name: "Team Gamma", score: 0 },
            stage: "semi_finals",
            matchDate: "2023-11-25",
            status: "scheduled"
          }
        ],
        final: []
      },
      prizeDistribution: [
        { place: 1, amount: "$25,000" },
        { place: 2, amount: "$15,000" },
        { place: 3, amount: "$7,500" },
        { place: 4, amount: "$2,500" }
      ]
    };
  }
};
