export interface Guild {
  allow_join: boolean;
  icon: string;
  id: string;
  invite_leaderboard: boolean;
  leaderboard_url: string;
  name: string;
  premium: boolean;
}

export interface Player {
  avatar: string;
  detailed_xp: number[];
  discriminator: string;
  guild_id: string;
  id: string;
  level: number;
  message_count: number;
  username: string;
  xp: number;
}

export interface RoleReward {
  role: {
    color: number;
    hoist: boolean;
    id: string;
    managed: boolean;
    mentionable: boolean;
    name: string;
    permissions: number;
    position: number;
  };
  level: number;
}

export interface UserGuildSettings {
  guild_id: string;
  use_default_rank_card: boolean;
  user_id: string;
}

export interface Leaderboard {
  admin: boolean;
  banner_url?: string;
  country: string;
  guild: Guild;
  is_member: boolean;
  page: number;
  player?: Player;
  players: Player[];
  role_rewards: RoleReward[];
  user_guild_settings: UserGuildSettings;
  xp_per_message: number[];
  xp_rate: number;
}
