import { NameGroupPair } from './name-group-pair';

export interface Trigger extends NameGroupPair {
  startTime: any;
  endTime: any;
  lastFireTime: any;
  nextFireTime: any;
}

export enum TriggerType {
  Unknown = 'unknown',
  Cron = 'cron',
  Simple = 'simple',
  Daily = 'daily',
  Calendar = 'calendar',
}

export interface BaseTriggerFormModel extends NameGroupPair {
  type: TriggerType;
  description: string;

  startTimeUtc: Date;
  endTimeUtc: Date;
  calendarName: string;
  priority: number;
}

export interface CronTriggerFormModel extends BaseTriggerFormModel {
  type: TriggerType.Cron;
  expression: string;
  timezone: string;
}

export interface SimpleTriggerFormModel extends BaseTriggerFormModel {
  type: TriggerType.Simple;
  repeatInterval?: number;
  repeatUnit: string;
  repeatCount?: number;
  repeatForever: boolean;
}

export interface DailyTriggerFormModel extends BaseTriggerFormModel {
  type: TriggerType.Daily;
  repeatInterval?: number;
  repeatUnit: string;
  repeatCount?: number;
  repeatForever: boolean;
}

export interface CalendarTriggerFormModel extends BaseTriggerFormModel {
  type: TriggerType.Calendar;
  repeatInterval?: number;
  repeatUnit: string;
  timezone: string;
  preserveHourAcrossDst: boolean;
  skipDayIfHourDoesNotExist: boolean;
}

export type TriggerFormModel = CronTriggerFormModel | SimpleTriggerFormModel | DailyTriggerFormModel;
