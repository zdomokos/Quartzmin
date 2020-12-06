import { NameGroupPair } from './name-group-pair';

export interface Execution {
  job: NameGroupPair;
  trigger: NameGroupPair;
  scheduledFireTime: any;
  actualFireTime: any;
  runTime: any;
}
