import { NameGroupPair } from './name-group-pair';

export interface Job extends NameGroupPair {
  description: string;
  type: string;
  persist: boolean;
  recovery: boolean;
  concurrent: boolean;
}
