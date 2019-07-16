export interface Job {
  groupName: string;
  jobName: string;
  description: string;
  type: string;

  persist: boolean;
  recovery: boolean;
  concurrent: boolean;
}
