import registry from '../../data/games.registry.json';

export type EmbedType = 'iframe' | 'external' | 'self';

export interface GameEmbed {
  type: EmbedType;
  url: string;
  aspectRatio?: string;
  sandbox?: string[];
  mobileSupported?: boolean;
}

export interface GameEntry {
  slug: string;
  title: string;
  cycle?: number;
  releasedAt: string;
  authors: string[];
  engine: string;
  embed: GameEmbed;
  tags?: string[];
  summary?: string;
  postmortem?: string;
  repo: string;
  thumbnail?: string;
}

export const games = registry as GameEntry[];

export function getGame(slug: string): GameEntry | undefined {
  return games.find((g) => g.slug === slug);
}

export function getGamesSorted(): GameEntry[] {
  return [...games].sort(
    (a, b) => new Date(b.releasedAt).getTime() - new Date(a.releasedAt).getTime(),
  );
}
