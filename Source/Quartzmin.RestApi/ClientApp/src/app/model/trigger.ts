import { NameGroupPair } from './name-group-pair';

export interface Trigger extends NameGroupPair {
  startTime: any;
  endTime: any;
  lastFireTime: any;
  nextFireTime: any;
}
