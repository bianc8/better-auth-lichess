export interface LichessPerf {
  games: number;
  rating: number;
  rd: number;
  prog: number;
  prov?: boolean;
}

export interface LichessPerfs {
  bullet?: LichessPerf;
  blitz?: LichessPerf;
  rapid?: LichessPerf;
  classical?: LichessPerf;
  correspondence?: LichessPerf;
  chess960?: LichessPerf;
  kingOfTheHill?: LichessPerf;
  threeCheck?: LichessPerf;
  antichess?: LichessPerf;
  atomic?: LichessPerf;
  horde?: LichessPerf;
  crazyhouse?: LichessPerf;
  puzzle?: LichessPerf;
  [key: string]: LichessPerf | undefined;
}

export interface LichessProfile {
  location?: string;
  cfcRating?: number;
  rcfRating?: number;
  flag?: string;
  dsbRating?: number;
  fideRating?: number;
  ecfRating?: number;
  uscfRating?: number;
  bio?: string;
  links?: string;
}

export interface LichessPlayTime {
  total: number;
  tv: number;
}

export interface LichessCount {
  all: number;
  rated: number;
  ai: number;
  draw: number;
  drawH: number;
  loss: number;
  lossH: number;
  win: number;
  winH: number;
  bookmark: number;
  playing: number;
  import: number;
  me: number;
}

export interface LichessUser {
  id: string;
  username: string;
  perfs: LichessPerfs;
  flair?: string;
  patron?: boolean;
  createdAt: number;
  profile?: LichessProfile;
  seenAt?: number;
  playTime?: LichessPlayTime;
  url?: string;
  count?: LichessCount;
  kid?: boolean;
  followable?: boolean;
  following?: boolean;
  blocking?: boolean;
}
