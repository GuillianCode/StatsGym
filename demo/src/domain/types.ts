export type Discipline = 'GAM' | 'GAF' | 'GR';

export interface ApparatusResult {
  a: string;
  nf?: number | null;
  nd?: number | null;
  ne?: number | null;
  art?: number | null;
  p?: number | null;
  b?: number | null;
  r?: number | null;
  rt?: number | null;
  du?: string | null;
}

export interface Competition {
  s: number;
  d: string;
  n?: string | null;
  c: string;
  l?: string | null;
  lb?: string | null;
  t?: 'IND' | 'EQU' | string;
  nf?: number | null;
  rg?: number | null;
  rgt?: number | null;
  ph?: string | null;
  pa?: string | null;
  pr?: string | null;
  gr?: string | null;
  co?: string | null;
  rc?: string | null;
  ci?: number | null;
  ri?: number | null;
  ag?: ApparatusResult[];
}

export interface Athlete {
  id: string;
  discipline: Discipline;
  lastName: string;
  firstName: string;
  club: string;
  results: Competition[];
}

export type Snapshot = Record<Discipline, Record<string, {n: string; p: string; c: string; r: Competition[]}>>;
