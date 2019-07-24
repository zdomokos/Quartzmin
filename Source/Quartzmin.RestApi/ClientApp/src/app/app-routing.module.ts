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

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {
    path: 'jobs', children: [
      {path: '', component: JobListComponent},
      {path: 'create', component: JobFormComponent},
      {path: ':jobId/edit', component: JobFormComponent},
    ]
  },
  {
    path: 'calendars', children: [
      {path: '', component: CalendarListComponent},
      {path: 'create', component: CalendarFormComponent},
      {path: ':calendarId/edit', component: CalendarFormComponent},
    ]
  },
  {
    path: 'triggers', children: [
      {path: '', component: TriggerListComponent},
      {path: 'create', component: TriggerFormComponent},
      {path: ':triggerId/edit', component: TriggerFormComponent},
    ]
  },
  {path: 'history', component: JobHistoryComponent},
  {path: 'executions', component: ExecutionListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
