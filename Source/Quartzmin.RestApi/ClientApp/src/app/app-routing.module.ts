import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobListComponent } from './jobs/job-list/job-list.component';
import { CalendarListComponent } from './calendars/calendar-list/calendar-list.component';
import { TriggerListComponent } from './triggers/trigger-list/trigger-list.component';
import { JobHistoryComponent } from './history/job-history/job-history.component';
import { ExecutionListComponent } from './executions/execution-list/execution-list.component';
import { JobFormComponent } from './jobs/job-form/job-form.component';
import { CalendarFormComponent } from './calendars/calendar-form/calendar-form.component';
import { TriggerFormComponent } from './triggers/trigger-form/trigger-form.component';

export enum TopLevelRoutes {
  DASHBOARD = 'dashboard',
  JOBS = 'jobs',
  CALENDARS = 'calendars',
  TRIGGERS = 'triggers',
  HISTORY = 'history',
  EXECUTIONS = 'executions'
}

export enum CrudRoutes {
  CREATE = 'create',
  EDIT = 'edit'
}

const routes: Routes = [
  {path: '', redirectTo: TopLevelRoutes.DASHBOARD, pathMatch: 'full'},
  {path: TopLevelRoutes.DASHBOARD, component: DashboardComponent},
  {
    path: TopLevelRoutes.JOBS, children: [
      {path: '', component: JobListComponent},
      {path: CrudRoutes.CREATE, component: JobFormComponent},
      {path: ':jobId/edit', component: JobFormComponent},
    ]
  },
  {
    path: TopLevelRoutes.CALENDARS, children: [
      {path: '', component: CalendarListComponent},
      {path: CrudRoutes.CREATE, component: CalendarFormComponent},
      {path: ':calendarId/edit', component: CalendarFormComponent},
    ]
  },
  {
    path: TopLevelRoutes.TRIGGERS, children: [
      {path: '', component: TriggerListComponent},
      {path: CrudRoutes.CREATE, component: TriggerFormComponent},
      {path: ':triggerId/edit', component: TriggerFormComponent},
    ]
  },
  {path: TopLevelRoutes.HISTORY, component: JobHistoryComponent},
  {path: TopLevelRoutes.EXECUTIONS, component: ExecutionListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
