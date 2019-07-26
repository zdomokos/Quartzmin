export interface ServerInfo {
  machineName: string;
  application: string;

  runningSince: Date;
  inStandByMode: boolean;
  shutdown: any;
  started: boolean;

  jobsCount: number;
  triggersCount: number;

  scheduler: {
    name: string;
    instanceId: string;
    remote: string;
    type: string;
    version: string;
  };
  jobStore: {
    clustered: boolean,
    supportsPersistence: boolean,
    type: string;
  };
  threadPool: {
    size: number;
    type: string;
  };
  jobs: {
    countExecuted: number;
    countRunning: number;
    countFailed: number;
  }
}
