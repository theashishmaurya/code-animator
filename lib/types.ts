export interface Slide {
  id: number;
  code: string;
}

export interface CodeDiff {
  added: string[];
  removed: string[];
  unchanged: string[];
}