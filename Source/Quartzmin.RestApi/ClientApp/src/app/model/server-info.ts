export interface ServerInfo {
  status: {
    machineName: string;
    application: string;
    version: string;
    runningSince: Date;
    inStandbyMode: boolean;
    shutdown: boolean;
    started: boolean;
    historyEnabled: boolean;
  };
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
  stats: {
    countJobs: number;
    countTriggers: number;
    executedJobs: number;
    runningJobs: number;
    failedJobs: number;
  };
}
